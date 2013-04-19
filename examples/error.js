
var pipeline = require('../');
var actions = require('./actions');

var badPipe = pipeline()
	.use(actions.step1)
	.use(actions.stepErr)
	.use(actions.step2)
	.use(actions.step3)
	.execute({ data: 'GO' }, function(err, context){
		if(err) {
			console.log('Error: %s', err);
		}
		console.log('Complete: %s', context.data);
	});

//	Output:
//  Executing step 1 GO
//  Executing step err GO
//  Error: Something whent wrong!
//  Complete GO