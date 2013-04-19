
# simple-pipeline

Simple-Pipeline is a node module for defining and executing a simple sequential workflow while maintaining and passing a context along from operation to operation.

## Installation

    $ npm install simple-pipeline

## Examples

### A simple workflow
Running the following from the package directory

    $ node examples/success

Executes the following;

```
var pipeline = require('simple-pipeline');

var goodPipe = pipeline()
	.use(step1)
	.use(step2)
	.use(step3)
	.execute({ data: 'GO' }, function(err, context){
		if(err) {
			console.log('Error: %s', err);
		}
		console.log('Complete: %s', context.data);
	});
```
Resulting in the following output;
 - Executing step 1 GO
 - Executing step 2 GO
 - Executing step 3 OK
 - Complete AOK!

 With the context data being updated from step to step

### Handling errors
Running the following from the package directory

    $ node examples/error

Executes the following;

```js
var pipeline = require('simple-pipeline');

var badPipe = pipeline()
	.use(step1)
	.use(stepErr)
	.use(step2)
	.use(step3)
	.execute({ data: 'GO' }, function(err, context){
		if(err) {
			console.log('Error: %s', err);
		}
		console.log('Complete: %s', context.data);
	});
```
Resulting in the following output;
 - Executing step 1 GO
 - Executing step err GO
 - Error: Something whent wrong!
 - Complete GO

All of the above use the step functions defined as follows;

```js
function step1(context, next){
	console.log('Executing step 1 %s', context.data);
	next();	
}
function step2(context, next){
	console.log('Executing step 2 %s', context.data);
	setTimeout(function(){
		context.data = 'OK';
		next();
	}, 1000);
}
function step3(context, next){
	console.log('Executing step 3 %s', context.data);
	context.data = 'AOK!';
	next();	
}
function stepErr(context, next){
	console.log('Executing step err %s', context.data);
	setTimeout(function(){
		next('Something whent wrong!');
	}, 1000);
}
```

## License 

(The MIT License)

Copyright (c) 2013 Colin Milhench &lt;colin@milhen.ch&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.