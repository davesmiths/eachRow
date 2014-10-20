/*github.com/davesmiths/eachRow*/
(function($, undefined) {

    'use strict';

    $.fn.eachVector = function(o) {

		// There are two types of vector (row or column):
/*

		o.type
		-1: off, all items are in the row
		0: Only items that start at the same point are in the row (default)
		1: starts
		2: starts and ends
		3: ends

*/
		o.vector = o.vector || 'row';
		o.type = o.type === undefined ? 0 : o.type;
		o.callback = o.callback || function() {};

    	var currentTop,
            items,
            spareTops,
            currentTallest,
            collection,
			collectionLength,
			collectionOuterLengths,
			collectionTops,
			$item,
			thisTop,
			thisTall,
			currentRowBottom,
			i,
			leftOrTop,
			outerWidthOrHeight
		;

		// Set left or top, outerHeight or outerWidth dependent on whether the vector is row or column
		leftOrTop = 'top';
		outerWidthOrHeight = 'outerHeight';
		if (o.vector === 'col') {
			leftOrTop = 'left';
			outerWidthOrHeight = 'outerWidth';
		}

		collection = this.slice();
		collectionLength = collection.length;

	    // While there are items in the collection
		while (collectionLength) {

			items = [];
			spareTops = [];
			collectionTops = [];
			collectionOuterLengths = [];

			if (o.type === -1) {
				// All items are in the vector
				items = collection;
			}
			else {

				// Find the items aligned at the start of the vector
				// The following takes into account that source order doesn't equal visual order
				currentTop = Number.POSITIVE_INFINITY;

				for (i = 0; i < collectionLength; i += 1) {

					$item = $(collection[i]);

					thisTop = collectionTops[i] = $item.offset()[leftOrTop];
					thisTall = collectionOuterLengths[i] = $item[outerWidthOrHeight]();

					if (thisTop < currentTop) {
						currentTop = thisTop;
						items = [];
						currentTallest = 0;
					}

					if (thisTop === currentTop) {
						items.push(collection[i]);
						if (currentTallest < thisTall) {
							currentTallest = thisTall;
						}
					}

				}
				currentRowBottom = currentTop + currentTallest;

				// Now find the extra ones if they exist
				if (o.type !== 0) {

					if (o.type === 1 || o.type === 2) {

						// Find items that start within the tallest
						// Loop through all items except those that appear at the top
						for (i = 0; i < collectionLength; i += 1) {

							// Only work with items not already in the row
							if ($.inArray(collection[i],items) < 0) {

								thisTop = collectionTops[i];

								if (thisTop < currentRowBottom) {
									if (o.type === 2) {
										if (thisTop + collectionOuterLengths[i] <= currentRowBottom) {
											items.push(collection[i]);
											spareTops.push([thisTop,collection[i]]);
										}
									}
									else {
										items.push(collection[i]);
										spareTops.push([thisTop,collection[i]]);
									}
								}
							}
						}
					}
					else {
						// type === 3
						// Find items that start within the tallest
						// Loop through all items except those that appear at the top
						for (i = 0; i < collectionLength; i += 1) {

							// Only work with items not already in the row
							if ($.inArray(collection[i],items) < 0) {

								thisTop = collectionTops[i] + collectionOuterLengths[i];

								if (thisTop <= currentRowBottom) {
									items.push(collection[i]);
									spareTops.push([collectionTops[i],collection[i]]);
								}
							}
						}
					}
				}
			}


			// Do the callback for each row
			o.callback.call(items);

//console.log(o.vector, spareTops, items);
			// Check items to see if any of the start positions has changed
			// If has changed then the item needs to be added back in to be re-evaluated
			for (i = 0; i < spareTops.length; i++) {
    			if (spareTops[i][0] !== $(spareTops[i][1]).offset()[leftOrTop]) {
    			    items = $(items).not(spareTops[i][1]);
    			}
			}

			// Continue with whatever is left
			collection = $(collection).not(items);
			collectionLength = collection.length;

		}

    	return this;

    };


    $.fn.eachRow = function(o) {
		o.vector = 'row';
    	return this.eachVector(o);
    };


    $.fn.eachCol = function(o) {
		o.vector = 'col';
    	return this.eachRow(o);
    };

}(jQuery));
