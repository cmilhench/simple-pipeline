module.exports.step1 = function(context, next){
	console.log('Executing step 1 %s', context.data);
	next();
};

module.exports.step2 = function(context, next){
	console.log('Executing step 2 %s', context.data);
	setTimeout(function(){
		context.data = 'OK';
		next();
	}, 1000);
};

module.exports.step3 = function(context, next){
	console.log('Executing step 3 %s', context.data);
	context.data = 'AOK!';
	next();
};

module.exports.stepErr = function(context, next){
	console.log('Executing step err %s', context.data);
	setTimeout(function(){
		next('Something whent wrong!');
	}, 1000);
};