var fs = require('fs');
var express = require('express');
var app = express();
var sql = require('mssql')
var https = require('https');
var bodyParser = require('body-parser');
var authentication = require('./authentication')

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(bodyParser.json());

//Test Function
app.get('/test', function(req,res){
	res.json({
		"id": "23",
		"msg": "Hallo from server"
	});
});


var authentication = {
    user: 'ibs_sup',
    password: 'pantaitw',
    server: 'pant-sql\\IBS', // You can use 'localhost\\instance' to connect to named instance
    database: 'pcalc_sql_test'
}

var inputs = [`select ru.ruleengine,
ru.ruleengine_nr,
pr.product,
pr.current_version,
cu.iso_code,
cu.currency_nr,
ca.Category,
ca.key_category,
cu.iso_code as currency,
pr.[@min_premium] as min_premium,
pr.[@min_rate] as min_rate,
pr.[@min_deductible] as min_deductible,
pr.rate_basis,
pr.product_nr
from TT_Product pr
join TT_RuleEngine ru on pr.ruleengine_nr = ru.ruleengine_nr
join TD_Category ca on pr.key_category = ca.key_category
join TD_Currency cu on pr.product_currency_nr = cu.currency_nr`]

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


function callDatabase(quer, cb){
  new sql.Request().query(quer, function(err, recordset) {
    if(err) console.log(err)
    // console.log(recordset);
    cb(recordset);
  });
}

app.get('/initialData', function (req,res){

	var arr = [];
	var cnt = 0;

  sql.close();
	sql.connect(authentication, function(){
    // error checks
    //if(err) console.log(err)
    // Query
    inputs.forEach((input) => {
    	new sql.Request().query(input, function(err, recordset) {
      // console.log(recordset);
        if(err) console.log(err)
        arr.push(recordset.recordset)
        cnt++
      	if(cnt == inputs.length){
      		res.json(arr);
      	}
	    });
    })
	});
})

app.get('/ProductVersion/:product_nr', function(req,res){
	var product = req.params.product_nr;
	callDatabase(`select
                Changelog,
                Staff,
                TS,
                version from TR_Product_Version
                where product_nr = `+product,
 function(result){
		res.json(result.recordset);
	})
})

app.get('/SQLfunction/:product_nr', function(req,res){
	var product = req.params.product_nr;
	callDatabase(`select SQL_function
                from TR_sql_function
                where product_nr = `+product,
 function(result){
		res.json(result.recordset);
	})
})

app.get('/ProductOffices/:product_nr', function(req,res){
	var product = req.params.product_nr;
	callDatabase(`select b.name, a.OrderBy
                from TR_Mandant a
                join TD_Mandant b on a.Mandant_nr = b.mandant_nr
                where a.Product_nr = `+product,
 function(result){
		res.json(result.recordset);
	})
})

app.get('/ProductCurrencies/:product_nr', function(req,res){
	var product = req.params.product_nr;
	callDatabase(`select b.iso_code, a.xrate
                from TR_Currency_Xrate a
                join TD_Currency b on a.currency_nr = b.currency_nr
                where a.product_nr = `+product,
 function(result){
		res.json(result.recordset);
	})
})

app.get('/ProductOutput/:product_nr', function(req,res){
	var product = req.params.product_nr;
	callDatabase(`select b.Output, a.Default_Base
                from TR_Product_Output a
                join TD_Output b on a.Output_nr = b.Output_nr
                where a.Product_nr = `+product,
 function(result){
		res.json(result.recordset);
	})
})

app.get('/ProductCalculations/:product_nr', function(req,res){
	var product = req.params.product_nr;
	callDatabase(`select b.property, a.Compute_order
                from TR_Calculation a
                join TT_Prop b on a.prop_nr = b.prop_nr
                where a.product_nr = `+product,
 function(result){
		res.json(result.recordset);
	})
})

app.get('/IBSproduct/:product_nr', function(req,res){
	var product = req.params.product_nr;
	callDatabase(`select b.IBSProduct from
                TR_Product_hprod a
                join TD_IBSProduct b on a.hprod_nr = b.hprod_nr
                where product_nr = `+product,
 function(result){
		res.json(result.recordset);
	})
})

app.get('/ruleEngineOptions', function(req,res){
	callDatabase(`select ruleengine_nr, ruleengine  from TT_RuleEngine`,
  function(result){
		res.json(result.recordset);
	})
})

app.get('/currencyOptions', function(req,res){
	callDatabase(`select currency_nr, iso_code from TD_Currency`,
  function(result){
		res.json(result.recordset);
	})
})

app.get('/categoryOptions', function(req,res){
	callDatabase(`select key_category, Category from TD_Category`,
  function(result){
		res.json(result.recordset);
	})
})

app.post(`/editProduct`,
function(req, res){
	callDatabase(`update TT_Product
		set ruleengine_nr = `+req.body.ruleEngine+`,
		product_currency_nr = `+req.body.currency+`,
		key_category = `+req.body.category+`,
		product= '`+req.body.name+`',
		[@min_premium] = '`+req.body.minPremium+`',
		[@min_rate] = '`+req.body.minRate+`',
		[@min_deductible] = '`+req.body.minDeductible+`',
		rate_basis = '`+req.body.rateBasis+`'
		where product_nr = `+req.body.productNr ,
  function(result){
		res.redirect('back');
	})
})

app.post(`/newProduct`,
function(req, res){
	callDatabase(`insert into TT_Product (
    ruleengine_nr,
    product_currency_nr,
    key_category,
    product,
    [@min_premium],
    [@min_rate],
    [@min_deductible],
    rate_basis)
    VALUES (
    `+req.body.ruleEngine+`,
    `+req.body.currency+`,
    `+req.body.category+`,
    '`+req.body.name+`',
    '`+req.body.minPremium+`',
    '`+req.body.minRate+`',
    '`+req.body.minDeductible+`',
    '`+req.body.rateBasis+`'
    )` ,
  function(result){
		res.redirect('back');
	})
})

app.get('/methodsData/:ruleengine_nr', function(req,res){
	var ruleengine_nr = req.params.ruleengine_nr;
	callDatabase(`select
    method_nr,
    method,
    weight,
    p.Priority,
    t.name as type
    from TT_Method m
    join TD_Typ t on m.typ_nr = t.typ_nr
    join TD_Priority p on m.Key_priority = p.Key_Priority
    where ruleengine_nr = `+ruleengine_nr,
 function(result){
		res.json(result.recordset);
	})
})

app.listen(3006, function(){
	console.log('Example app listening on port 3006')
})
