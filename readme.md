eachRow
=======
__For each row of elements in a collection execute a function; a jQuery utility plugin__

Usage
-----
```
$(function() {
	$('.things').eachRow({
		type:1,
		callback:function() {
			console.log('Row',this);
		}
	});
});
```

More stuff
----------
```
$(function() {

    // eachCol
    $('.things').eachCol({
        type:1,
        callback:function() {
            console.log('Col',this);
        }
    });

    // eachCol and eachRow are pretty much aliases for eachVector
    $('.things').eachVector({
        vector: 'row',
        type:1,
        callback:function() {
            console.log('Vector row',this);
        }
    });
});
```
