// Immediate function that creates a scope for our widget
// declaration.
(function( $ ) {
    
    // The slider events we want to hijack and extend.
    var events = [ "create", "start", "stop", "slide", "change" ];
    
    // Start our slider widget extension.
    $.widget( "app.slider", $.ui.slider, {
        
        // This method gives the "create" event data. We need the "value"
        // property here, which doesn't exist by default.
        _getCreateEventData: function() {
            return { value: this.value() };
        },
        
        // It's important to call _init() here instead of _create() since
        // we're setting an option value. The "max" option should be the
        // length of the "steps" array if it exists.
        _init: function() {
            var steps = this.options.steps;
            if ( $.isArray( steps ) ) {
                this.option( "max", steps.length - 1 );    
            }
        },
    
        _trigger: function( name, e, ui ) {
            
            // The steps value array we want passed in the slider
            // event data.
            var steps = this.options.steps;

            // If there's no "steps" option, do the default action.
            if ( !$.isArray( steps ) ) {
                return this._superApply( arguments );
            }
            
            // Is this an event we're interested in? Check the "events" array.
            if ( $.inArray( name, events ) >= 0 ) {
                
                // Call the default _trigger() implementation, using custom
                // data. Specifically, the step value from the array.
                return this._superApply([
                    name,
                    e,
                    $.extend( ui, {
                        stepValue: steps[ ui.value ]
                    })
                ]);
            }
            
            return this._superApply( arguments );
            
        }
        
    });

})( jQuery );

$(function() {
    
    // Create the slider using the new "steps" option. Notice the new
    // "stepValue" property available in the event handler functions.
    $("#slider").slider({
        range: "min",
        steps: [ 1, 2, 3, 5, 8, 13 ],
        change: function( e, ui ) {
            $( "#amount" ).val( ui.stepValue );
        },
        create: function( e, ui ) {
            $( "#amount" ).val( ui.stepValue );
        }
    });
    
});
