var express = require('express');
var router = express.Router();
const helper = require('../helpers');
const util = require('../helpers/util');

module.exports = function(pool){
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('login');
  });

  router.post('/', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let sql = `SELECT COUNT(email) AS count FROM users WHERE email= '${email}' AND password= '${password}'`;
    pool.query(sql, (err, data) => {
      if(data.rows[0].count > 0){
        req.session.email = email;
        res.redirect('/projects');
      }else{
        res.redirect('/');
      }
    })
  })

  router.get('/projects', helper, function(req, res, next) {
    let offset = req.query.of || 0;
    let currentPage = req.query.cp || 1;
    let sqlprojects = `SELECT * FROM projects ORDER BY projectid LIMIT 3 OFFSET ${offset}`;
    pool.query(sqlprojects, (err, prjk) => {
      if(err) throw err;
      pool.query(`SELECT COUNT(projectid) AS count FROM projects`, (err, row) => {
        if(err) throw err;
        let page = Math.ceil(row.rows[0].count/3);
        pool.query(`SELECT users.firstname || ' ' || users.lastname AS fullname, members.projectid FROM users, members WHERE users.userid = members.userid AND members.projectid IN (SELECT projectid FROM projects ORDER BY projectid LIMIT 3 OFFSET ${offset})`, (err, data) => {
          if (err) throw err;
          //kelemahannya tidak bisa membaca data jika data hanya terdiri dari nama depannya saja
          pool.query(`SELECT CONCAT(firstname, ' ',lastname) AS fullname, firstname FROM users`, (err, data2) => {
            if(err) throw err;
            //bisa membaca data walaupun tidak memiliki nama belakang
            pool.query(`SELECT admin FROM users WHERE email = '${req.session.email}'`, (err, pid) => {
              if(err) throw err;
              pool.query(`SELECT * FROM cek`, (err, cek) => {
                if(err) throw err;
                let projectsdata = prjk.rows.map(function(item){
                  item.members = data.rows.filter(function(x){
                    return x.projectid == item.projectid
                  }).map(function(a){ return a.fullname })
                })
                //item.members-> members adalah atribut yang dikirm untuk membaca data alias nama
                res.render('projects', {page: page, currentPage: currentPage, prjk: prjk.rows, data2: data2.rows, cek: cek.rows, query: req.query, pid: pid.rows});
              })
            })
          })
        })
      })
    })
  });

  router.get('/search', helper, function(req, res, next) {
    let arr = [];
    let check = false;
    if(req.query.ckid && req.query.id){
      arr.push(`projects.projectid = ${req.query.id}`)
      check = true;
    }
    if(req.query.ckname && req.query.name){
      arr.push(`projects.name = '${req.query.name}'`)
      check = true;
    }
    if(req.query.ckmembers && req.query.members){
      arr.push(`users.firstname = '${req.query.members}'`)
      check = true;
    }
    if(check){
      sql = `SELECT * FROM projects WHERE ${arr.join(' AND ')}`;
      pool.query(sql, (err, prjk) => {
        if(err) throw err;
        //prjk di kirim untuk menampilkan tabel
        pool.query(`SELECT CONCAT(firstname, ' ',lastname) AS fullname, firstname FROM users`, (err, data2) => {
          if (err) throw err;
          pool.query(`SELECT users.firstname || ' ' || users.lastname AS fullname, members.projectid FROM users, members WHERE users.userid = members.userid AND members.projectid IN (SELECT projectid FROM projects)`, (err, data) => {
            if (err) throw err;
            pool.query(`SELECT * FROM cek`, (err, cek) => {
              if(err) throw err;
              let projectsdata = prjk.rows.map(function(item){
                item.members = data.rows.filter(function(x){
                  return x.projectid == item.projectid
                }).map(function(a){ return a.fullname })
              })
              res.render('projects', {prjk: prjk.rows, currentPage: 1, page: 1, query: req.query, data2: data2.rows, cek: cek.rows})
            })
          })
        })
      })
    }else{
      res.redirect('/projects')
    }
  });

  router.get('/cek', helper, function(req, res, next) {
    let email = req.session.email;
    let arr = [];
    req.query.ck_id ? arr.push("ck_id = true") : arr.push("ck_id = false");
    req.query.ck_name ? arr.push("ck_name = true") : arr.push("ck_name = false");
    req.query.ck_members ? arr.push("ck_members = true") : arr.push("ck_members = false");
    let sql = `UPDATE cek SET ${arr.join(", ")} WHERE email = '${email}'`;
    pool.query(sql, (err) => {
      if(err) throw err;
      res.redirect('/projects')
    })
  })

  router.get('/profile', helper, function(req, res, next) {
    let email = req.session.email;
    let sql = `SELECT * FROM users WHERE email = '${email}'`;
    pool.query(sql, (err, data) => {
      if (err) throw err;
      res.render('profile', {data: data.rows, email: email});
    })
  });

  router.post('/profile', helper, function(req, res, next) {
    let email = req.session.email;
    let password = req.body.password;
    let position = req.body.position;
    let type = req.body.type;
    let sql = `UPDATE users SET password = '${password}', role = '${position}', type = '${type}' WHERE email = '${email}'`;
    pool.query(sql, (err) => {
      if (err) throw err;
      res.redirect('/projects');
    });
  })

  router.get('/addProject', helper, function(req, res, next) {
    let sql = `SELECT CONCAT(firstname, ' ',lastname) AS fullname, userid FROM users`;
    pool.query(sql, (err, data) => {
      if(err) throw err;
      res.render('addProject', {data: data.rows});
    })
  });

  router.post('/addProject', helper, function(req, res, next) {
    let name = req.body.name;
    let member = req.body.member;
    let arr = [];
    pool.query(`INSERT INTO projects (name) VALUES ('${name}')`, (err) => {
      if (err) throw err;
      pool.query(`SELECT projectid FROM projects ORDER BY projectid DESC LIMIT 1`, (err, data) => {
        for (let i = 0; i < member.length; i++) {
          pool.query(`INSERT INTO members (userid, projectid) VALUES (${member[i]}, ${data.rows[0].projectid})`, (err) => {
            if (err) throw err;
            if(i == member.length - 1){
              res.redirect('/projects');
            }
          })
        }
      })
    })
  });

  router.get('/editProject/:id', helper, function(req, res, next) {
    let id = req.params.id;
    let sql = `SELECT members.userid, members.projectid, projects.name, projects.projectid FROM members, projects WHERE projects.projectid = ${id} AND members.projectid = ${id} AND members.projectid = projects.projectid `;
    pool.query(sql, (err, data) => {
      if(err) throw err;
      pool.query(`SELECT firstname || ' ' || lastname AS fullname, userid FROM users`, (err, user) => {
        if(err) throw err;
        res.render('editProject', {data: data.rows, user: user.rows});
      })
    })
  });

  router.post('/editProject/:id', helper, function(req, res, next) {
    let id = req.params.id;
    let name = req.body.name;
    let member = req.body.member;
    pool.query(`UPDATE projects SET name = '${name}' WHERE projectid = ${id}`, (err) => {
      if (err) throw err;
      pool.query(`DELETE FROM members WHERE projectid = ${id}`, (err) => {
        if (err) throw err;
        for(let i = 0; i < member.length; i++){
          pool.query(`INSERT INTO members (userid, projectid) VALUES (${member[i]}, ${id})`, (err) => {
            if (err) throw err;
            if(i == member.length -1){
              res.redirect('/projects');
            }
          })
        }
      })
    })
  });

  router.get('/deleteProject/:id', helper, function(req, res, next) {
    let id = req.params.id;
    pool.query(`DELETE FROM members WHERE projectid = ${id}`, (err) => {
      if(err) throw err;
      //harus didahulukan tabel yang memforeign key tabel lain
      pool.query(`DELETE FROM projects WHERE projectid = ${id}`, (err) => {
        if(err) throw err;
        res.redirect('/projects');
      })
    })
  });

  router.get('/overview/:id', helper, function(req, res, next) {
    let id = req.params.id;
    let sql = `SELECT users.firstname || ' ' || users.lastname AS fullname FROM users, members WHERE users.userid = members.userid AND members.projectid = ${id} ORDER BY users.userid`;
    pool.query(sql, (err, prjk) => {
      if(err) throw err;
      pool.query(`SELECT COUNT(issueid) FROM issues WHERE projectid = ${id} AND tracker = 'Bug'`, (err, bug) => {
        if(err) throw err;
        pool.query(`SELECT COUNT(issueid) FROM issues WHERE projectid = ${id} AND status != 'Closed' AND tracker = 'Bug'`, (err, openbug) => {
          if(err) throw err;
          pool.query(`SELECT COUNT(issueid) FROM issues WHERE projectid = ${id} AND tracker = 'Feature'`, (err, feat) => {
            if(err) throw err;
            pool.query(`SELECT COUNT(issueid) FROM issues WHERE projectid = ${id} AND status != 'Closed' AND tracker = 'Feature'`, (err, openfeat) => {
              if(err) throw err;
              pool.query(`SELECT COUNT(issueid) FROM issues WHERE projectid = ${id} AND tracker = 'Support'`, (err, sup) => {
                if(err) throw err;
                pool.query(`SELECT COUNT(issueid) FROM issues WHERE projectid = ${id} AND status != 'Closed' AND tracker = 'Support'`, (err, opensup) => {
                  if(err) throw err;
                  res.render('overview', {id: id, prjk: prjk.rows, bug: bug.rows, feat: feat.rows, sup: sup.rows, openbug: openbug.rows, openfeat: openfeat.rows, opensup: opensup.rows})
                })
              })
            })
          })
        })
      })
    })
  })

  router.get('/members/:id', helper, function(req, res, next) {
    let id = req.params.id;
    let offset = req.query.of || 0;
    let currentPage = req.query.cp || 1;
    pool.query(`SELECT * FROM members WHERE projectid = ${id} ORDER BY userid LIMIT 4 OFFSET ${offset}`, (err, data) => {
      if(err) throw err;
      pool.query(`SELECT COUNT(members.userid) AS count FROM members, users WHERE users.userid = members.userid AND members.projectid = ${id}`, (err, row) => {
        if(err) throw err;
        let page = Math.ceil(row.rows[0].count/3);
        pool.query(`SELECT * FROM cekmembers`, (err, cek) => {
          if(err) throw err;
          pool.query(`SELECT users.firstname, users.role FROM users, members WHERE users.userid = members.userid AND members.projectid = ${id} ORDER BY users.userid`, (err, mbrs) => {
            if (err) throw err;
            res.render('members', {id: id, page: page, currentPage: currentPage, data: data.rows, cek: cek.rows, mbrs: mbrs.rows, query: req.query});
          })
        })
      })
    })
  })

  router.get('/searchMembers/:id', helper, function(req, res, next) {
    let arr = [];
    let id = req.params.id;
    let check = false;
    if(req.query.ckid && req.query.id){
      arr.push(`members.userid = ${req.query.id}`)
      check = true;
    }
    if(req.query.ckname && req.query.name){
      arr.push(`users.firstname = '${req.query.name}'`)
      check = true;
    }
    if(req.query.ckrole && req.query.role){
      arr.push(`users.role = '${req.query.role}'`)
      check = true;
    }
    if(check){
      sql = `SELECT * FROM members, users WHERE members.projectid = ${id} AND ${arr.join(' AND ')} ORDER BY users.userid`;
      pool.query(sql, (err, data) => {
        if(err) throw err;
        pool.query(`SELECT * FROM cekmembers`, (err, cek) => {
          if(err) throw err;
          pool.query(`SELECT users.firstname, users.role FROM users, members WHERE users.userid = members.userid AND members.projectid = ${id} AND ${arr.join(' AND ')}`, (err, mbrs) => {
            if (err) throw err;
            pool.query(`SELECT firstname || ' ' || lastname AS fullname, userid, role FROM users`, (err, data2) => {
              if (err) throw err;
              res.render('members', {id: id, currentPage: 1, page: 1, query: req.query, data: data.rows, mbrs: mbrs.rows, cek: cek.rows})
            })
          })
        })
      })
    }else{
      res.redirect(`../members/${id}`)
    }
  });
  // params dan isi dari param yang dikirimkan harus sama dengan yang dikirimkan oleh induknya

  router.get('/addMembers/:id', helper, function(req, res, next) {
    let id = req.params.id;
    pool.query(`SELECT firstname || ' ' || lastname AS fullname, userid FROM users ORDER BY userid`, (err, data) => {
      if (err) throw err;
      pool.query(`SELECT members.userid, members.projectid FROM members, users, projects WHERE members.userid = users.userid AND members.projectid = projects.projectid AND projects.projectid = ${id}`, (err, prjk) => {
        if (err) throw err;
        res.render('addMembers', {id: id, data: data.rows, prjk: prjk.rows});
      })
    })
  });

  router.post('/addMembers/:id', helper, function(req, res, next) {
    let id = req.params.id;
    let name = req.body.name;
    let arr = [];
    for (let i = 0; i < name.length; i++) {
      pool.query(`INSERT INTO members (userid, projectid) VALUES (${name[i]}, ${id})`, (err) => {
        if (err) throw err;
        if(i == name.length - 1){
          res.redirect(`/members/${id}`);
        }
      })
    }
  });

  router.get('/deleteMember/:id/:userid', helper, function(req, res, next) {
    let id = req.params.id;
    let userid = req.params.userid;
    pool.query(`DELETE FROM members WHERE projectid = ${id} AND userid = ${userid}`, (err) => {
      if(err) throw err;
      res.redirect(`/members/${id}`);
    })
  });

  router.get('/cekmembers/:id', helper, function(req, res, next) {
    let id = req.params.id;
    let email = req.session.email;
    let arr = [];
    req.query.ck_id ? arr.push('ck_id = true') : arr.push('ck_id = false')
    req.query.ck_name ? arr.push('ck_name = true') : arr.push('ck_name = false')
    req.query.ck_role ? arr.push('ck_role = true') : arr.push('ck_role = false')
    pool.query(`UPDATE cekmembers SET ${arr.join(', ')} WHERE email = '${email}'`, (err) => {
      if(err) throw err;
      res.redirect(`../members/${id}`)
    })
  });

  router.get('/issues/:id', helper, function(req, res, next) {
    let id = req.params.id;
    let offset = req.query.of || 0;
    let currentPage = req.query.cp || 1;
    pool.query(`SELECT * FROM issues WHERE projectid = ${id} ORDER BY issueid LIMIT 3 OFFSET ${offset}`, (err, isu) => {
      if(err) throw err;
      pool.query(`SELECT COUNT(issueid) AS count FROM issues WHERE projectid = ${id}`, (err, row) => {
        if(err) throw err;
        let page = Math.ceil(row.rows[0].count/3);
        pool.query(`SELECT * FROM cekissues`, (err, cek) => {
          if(err) throw err;
          res.render('issues', {id: id, page: page, currentPage: currentPage, isu: isu.rows, cek: cek.rows, query: req.query});
        })
      })
    })
  });

  router.get('/searchIssues/:id', helper, function(req, res, next) {
    let arr = [];
    let id = req.params.id;
    let check = false;
    if(req.query.ckid && req.query.id){
      arr.push(`issueid = ${req.query.id}`)
      check = true;
    }
    if(req.query.cksubject && req.query.subject){
      arr.push(`subject = '${req.query.subject}'`)
      check = true;
    }
    if(req.query.cktracker && req.query.tracker){
      arr.push(`tracker = '${req.query.tracker}'`)
      check = true;
    }
    if(check){
      sql = `SELECT * FROM issues WHERE projectid = ${id} AND ${arr.join(' AND ')}`;
      pool.query(sql, (err, isu) => {
        if(err) throw err;
        pool.query(`SELECT * FROM cekissues`, (err, cek) => {
          if(err) throw err;
          res.render('issues', {id: id, currentPage: 1, page: 1, query: req.query, isu: isu.rows, cek: cek.rows})
        })
      })
    }else{
      res.redirect(`../issues/${id}`)
    }
  });

  router.get('/cekissues/:id', helper, function(req, res, next) {
    let id = req.params.id;
    let email = req.session.email;
    let arr = [];
    req.query.ck_id ? arr.push('ck_id = true') : arr.push('ck_id = false');
    req.query.ck_subject ? arr.push('ck_subject = true') : arr.push('ck_subject = false');
    req.query.ck_tracker ? arr.push('ck_tracker = true') : arr.push('ck_tracker = false');
    pool.query(`UPDATE cekissues SET ${arr} WHERE email = '${email}'`, (err) => {
      if(err) throw err;
      res.redirect(`/issues/${id}`)
    })
  })

  router.get('/newIssues/:id', helper, function(req, res, next) {
    let id = req.params.id;
    pool.query(`SELECT users.firstname || ' ' || users.lastname AS fullname, users.userid FROM users, members WHERE users.userid = members.userid AND members.projectid = ${id}`, (err, mbrs) => {
      if(err) throw err;
      res.render('newIssues', {id: id, mbrs: mbrs.rows})
    })
  })

  router.post('/newIssues/:id', helper, function(req, res, next) {
    let id = req.params.id;
    let tracker = req.body.tracker;
    let subject = req.body.subject;
    let description = req.body.description;
    let status = req.body.status;
    let priority = req.body.priority;
    let assignee = req.body.assignee;
    let sdate = req.body.sdate;
    let ddate = req.body.ddate;
    let etime = req.body.etime;
    let done = req.body.done;
    let files = req.body.files;
    let sql = `INSERT INTO issues (tracker, subject, description, status, priority, assignee, startdate, duedate, estimatedtime, done, files, projectid) VALUES ('${tracker}', '${subject}', '${description}', '${status}', '${priority}', ${assignee}, '${sdate}', '${ddate}', '${etime}', ${done}, '${files}', ${id})`;
    pool.query(sql, (err) => {
      if(err) throw err;
      pool.query(`SELECT issueid FROM issues ORDER BY issueid DESC LIMIT 1`, (err, iid) => {
        if(err) throw err;
        pool.query(`SELECT firstname FROM users WHERE email = '${req.session.email}'`, (err, user) => {
          insertLog(subject, iid.rows[0].issueid, 'added issue', status, user.rows[0].firstname, id, () => {
            res.redirect(`../issues/${id}`)
          })
        })
      })
    })
  })

  router.get('/editIssues/:id/:issueid', helper, function(req, res, next) {
    let id = req.params.id;
    let issueid = req.params.issueid;
    let sql = `SELECT * FROM issues WHERE projectid = ${id} AND issueid = ${issueid}`;
    pool.query(sql, (err, isu) => {
      if(err) throw err;
      pool.query(`SELECT users.firstname || ' ' || users.lastname AS fullname, users.userid FROM users, members WHERE users.userid = members.userid AND members.projectid = ${id}`, (err, mbrs) => {
        if(err) throw err;
        res.render('editIssues', {id: id, isu: isu.rows, mbrs: mbrs.rows, util});
      })
    })
  });

  router.post('/editIssues/:id/:issueid', helper, function(req, res, next) {
    let id = req.params.id;
    let issueid = req.params.issueid;
    let tracker = req.body.tracker;
    let subject = req.body.subject;
    let description = req.body.description;
    let status = req.body.status;
    let priority = req.body.priority;
    let assignee = req.body.assignee;
    let sdate = req.body.sdate;
    let ddate = req.body.ddate;
    let etime = req.body.etime;
    let done = req.body.done;
    let files = req.body.files;
    let stime = req.body.stime;
    let tversion = req.body.tversion;
    let author = req.body.author;
    let cdate = req.body.cdate;
    let udate = req.body.udate;
    let clodate = req.body.clodate;
    let ptask = req.body.ptask;
    let sql = `UPDATE issues SET tracker = '${tracker}', subject = '${subject}', description = '${description}', status = '${status}', priority = '${priority}', assignee = ${assignee}, startdate = '${sdate}', duedate = '${ddate}', estimatedtime = '${etime}', done = ${done}, files = '${files}', spendtime = '${stime}', targetversion = '${tversion}', author = ${author}, createddate = '${cdate}', updatedate = '${udate}', closeddate = '${clodate}', parenttask = ${ptask} WHERE issueid = ${issueid} AND projectid = ${id}`;
    pool.query(sql, (err) => {
      if (err) throw err;
      pool.query(`SELECT firstname FROM users WHERE email = '${req.session.email}'`, (err, user) => {
        if(err) throw err;
        insertLog(subject, issueid, "modified issue", status, user.rows[0].firstname, id, () => {
          res.redirect(`../../issues/${id}`);
        })
      })
    })
  });
  //harus kembali dua kali(../../issues) karena edit isu masuk melalui halaman projects dan isu

  router.get('/deleteIssues/:id/:issueid', helper, function(req, res, next) {
    let id = req.params.id;
    let issueid = req.params.issueid;
    pool.query(`SELECT subject, status FROM issues WHERE issueid = ${issueid}`, (err, issues) => {
      if(err) throw err;
      pool.query(`SELECT firstname FROM users WHERE email = '${req.session.email}'`, (err, user) => {
        if(err) throw err;
        insertLog(issues.rows[0].subject, issueid, 'deleted issue', issues.rows[0].status, user.rows[0].firstname, id, () => {
          pool.query(`DELETE FROM issues WHERE projectid = ${id} AND issueid = ${issueid}`, (err) => {
            if(err) throw err;
            res.redirect(`/issues/${id}`);
          })
        })
      })
    })
  });

  router.get('/activity/:id', helper, function(req, res, next) {
    let id = req.params.id;
    let date = util.formatDates();
    let day = util.formatDays();
    let arr = [];
    pool.query(`SELECT note FROM activity WHERE logdate = '${date[0]}' AND projectid = ${id}`, (err, act) => {
      if(err) throw err;
      if(act.rows.length > 0) arr.push({day: `Today - ${day[0]}, ${date[0]}`, act: act.rows});
      pool.query(`SELECT note FROM activity WHERE logdate = '${date[1]}' AND projectid = ${id}`, (err, act) => {
        if(err) throw err;
        if(act.rows.length > 0) arr.push({day: `Yesterday - ${day[1]}, ${date[1]}`, act: act.rows});
        pool.query(`SELECT note FROM activity WHERE logdate = '${date[2]}' AND projectid = ${id}`, (err, act) => {
          if(err) throw err;
          if(act.rows.length > 0) arr.push({day: `${day[2]}, ${date[2]}`, act: act.rows});
          pool.query(`SELECT note FROM activity WHERE logdate = '${date[3]}' AND projectid = ${id}`, (err, act) => {
            if(err) throw err;
            if(act.rows.length > 0) arr.push({day: `${day[3]}, ${date[3]}`, act: act.rows});
            pool.query(`SELECT note FROM activity WHERE logdate = '${date[4]}' AND projectid = ${id}`, (err, act) => {
              if(err) throw err;
              if(act.rows.length > 0) arr.push({day: `${day[4]}, ${date[4]}`, act: act.rows});
              pool.query(`SELECT note FROM activity WHERE logdate = '${date[5]}' AND projectid = ${id}`, (err, act) => {
                if(err) throw err;
                if(act.rows.length > 0) arr.push({day: `${day[5]}, ${date[5]}`, act: act.rows});
                pool.query(`SELECT note FROM activity WHERE logdate = '${date[6]}' AND projectid = ${id}`, (err, act) => {
                  if(err) throw err;
                  if(act.rows.length > 0) arr.push({day: `${day[6]}, ${date[6]}`, act: act.rows});
                  res.render('activity', {id: id, arr: arr, dateNow: date[0], dateBefore: date[6]})
                  //console.log(${arr}) => akan menghasilkan [object Object] itu sebenarnya bisa diakses yang penting kita tau isinya apa
                  // arr[0].act.map((n, i) => console.log(`data ke-${i}`,n)) ==== supaya data didalam [object Object] bisa terbaca
                })
              })
            })
          })
        })
      })
    })
  });

  router.get('/signout', function(req, res){
    req.session.destroy();
    res.redirect('/');
  })

  function insertLog(subject, issueid, description, status, author, id, cb){
    let date = new Date();
    let dateNow = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    let note = `${date.getHours()}:${date.getMinutes()} ${subject} #${issueid} (${status}): ${description}, author: ${author}`;
    pool.query(`INSERT INTO activity (logdate, note, projectid) VALUES ('${dateNow}', '${note}', ${id})`, (err) => {
      if (err) throw err;
      cb();
    })
  }

  return router;
}
