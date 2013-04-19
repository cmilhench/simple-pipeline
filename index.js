/**
 * Simple Pipeline Module
 * Copyright (c) 2013. Colin Milhench.
 * MIT Licensed
 */

// expose createPipeline() as the module

exports = module.exports = createPipeline;

/**
 * Create a new pipeline
 * 
 * @return {Object} pipeline
 */
 function createPipeline(){
	var stack = [];
	return {
		/**
		 * Registeres a step for the pipeline to call in sequence.
		 * 
		 * @param  {Function} step function
		 * @return {Pipeline} for chaining
		 */
		use: function(fn){
			stack.push(fn);
			return this;
		},
		/**
		 * Starts the pipeline with a given context.
		 * 
		 * @param  {Object} context to be passed to each step
		 * @param  {Function} completion callback
		 */
		execute: function(context, cb){
			var index = 0;
			function next(err){
				var action = stack[index++];
				if (!action) {
					cb(err, context);
					return;
				}
				try {
					if (err) {
						next(err);
					} else {
						action(context, next);
					}
				} catch (e) {
					next(e);
				}
			}
			next();
		}
	};
}