
;
(function(window, undefined) {
    var fp = new AlloyTouch.FullPage("#fullpage", {
        showClass: 'show',
        hideClass: 'hide',
        animationEnd:function () {
        },
        leavePage: function (index) {
           console.log("leave"+index)
        },
        beginToPage: function (index) {
           console.log("to"+index);
        }
    });
})(window);
