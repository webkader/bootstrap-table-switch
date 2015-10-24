/* ========================================================================
 * Bootstrap Table Switch
 * Copyright 2015 Baris Aydin
 * Licensed under MIT (https://github.com/webkader/bootstrap-table-switch/blob/master/LICENSE)
 * ======================================================================== */
+ function($) {
    'use strict';

    if (!$.fn.bootstrapTable) {
        throw new Error("BootstrapTableSwitch required Bootstrap Table!")
    }

    // CLASS DEFINITION
    // =========================

    var BootstrapTableSwitch = function(element) {
        this.$element = $(element)
        this.bootstrapTable = this.$element.data('bootstrap.table')
        this.options = $.extend({}, BootstrapTableSwitch.DEFAULTS, this.bootstrapTable.options)
        this.$selectItemName = $.fn.bootstrapTable.utils.sprintf('[name="%s"]', this.options.selectItemName)
        this.$selectItem = this.$element.find(this.$selectItemName)
        this.$container = null

        this.init();
    }

    BootstrapTableSwitch.DEFAULTS = {
        switchEnabled: true,
        onText: "ON",
        offText: "OFF"
    }

    BootstrapTableSwitch.prototype.init = function() {
        // CHECK CSS TRANSITION SUPPORT (Bootstrap: transition.js)
        if (!$.support.transition) return;

        // CHECK ISSET ITEMNAME
        if (!this.$selectItem.length) return;

        if (!this.options.switchEnabled) return;

        // if enable, disable option clickToSelect
        if (this.bootstrapTable.options.clickToSelect) {
            this.bootstrapTable.options.clickToSelect = false;
        }

        this.initContainer();
        this.initState();
        this.initEvents();
    };

    BootstrapTableSwitch.prototype.initContainer = function() {
        var $input = $(this.$selectItem);

        $input.wrap('<div class="bs-table-switch"></div>');
        $input.after(
            '<div class="switch-container clearfix">' +
            '<div class="switch-slider"></div>' +
            '<span class="switch-label onText">' + this.options.onText + '</span>' +
            '<span class="switch-label offText">' + this.options.offText + '</span>' +
            '</div>'
        );

        this.$container = $input.closest('.bs-table-switch');
    };

    BootstrapTableSwitch.prototype.initState = function() {

        this.$selectItem.each(function() {

            var $container = $(this).closest('.bs-table-switch');

            if ($(this).is(':checked')) {
                $(this).is(':disabled') ? $container.addClass('is-active is-disabled') : $container.addClass('is-active');
            } else if ($(this).is(':disabled')) {
                $container.addClass('is-disabled');
            } else {
                $container.removeClass('is-active');
            }

        });

    };

    BootstrapTableSwitch.prototype.initEvents = function() {

        var $selectItem = this.$selectItemName;

        this.$element.find('tbody tr').off('click.bootstrap.table.switch').on('click.bootstrap.table.switch', '.bs-table-switch:not(.is-disabled)', function(e) {
            e.preventDefault();

            $(this).find($selectItem).trigger('click');
            $(this)[!$(this).hasClass('is-active') ? 'addClass' : 'removeClass']('is-active');
        });

        // Bind the swipeHandler
        $('.bs-table-switch:not(.is-disabled)').on('swipeleft.bootstrap.table.switch', function(e) {
            e.preventDefault();

            $(this).find($selectItem).trigger('click');
            $(this).removeClass('is-active');
        });

        $('.bs-table-switch:not(.is-disabled)').on('swiperight.bootstrap.table.switch', function(e) {
            e.preventDefault();

            $(this).find($selectItem).trigger('click');
            $(this).addClass('is-active');
        });

        $('.bs-table-switch').on('swipeup.bootstrap.table.switch', function(e) {
            e.preventDefault();
        });

        $('.bs-table-switch').on('swipedown.bootstrap.table.switch', function(e) {
            e.preventDefault();
        });

        if (!this.options.singleSelect && this.options.checkboxHeader) {
            var $container = $(this.$container);
            var $header = this.$element.find('thead');

            $header.on('click', '[name="btSelectAll"]', function() {

                var $checked = $(this).is(':checked') ? true : false;

                $container.each(function() {
                    if (!$(this).hasClass('is-disabled')) {
                        $(this)[$checked === true ? 'addClass' : 'removeClass']('is-active');
                    }
                });

            });
        }
    };

    // SWIPE EVENTS
    // ==========================

    var startX = 0;
    var startY = 0;
    var active = false;

    function onTouchEnd() {
        this.removeEventListener('touchmove', onTouchMove);
        this.removeEventListener('touchend', onTouchEnd);
        active = false; // nothing moved
    }

    function onTouchMove(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        if (active) {
            var touch = (e.touches.length == 1) ? e.touches[0] : e.targetTouches[0];
            var dx = startX - touch.pageX;
            var dy = startY - touch.pageY;
            var direction = null;

            if (Math.abs(dx) >= 40) {
                direction = dx > 0 ? 'left' : 'right';
            } else if (Math.abs(dy) >= 40) {
                direction = dy > 0 ? 'down' : 'up'; // vertical swipe
            }

            if (direction != null) {
                onTouchEnd.call(this);
                $(this).trigger('swipe', direction).trigger('swipe' + direction + '.bootstrap.table.switch');
            }
        }
    }

    function onTouchStart(e) {
        var touch = (e.touches.length == 1) ? e.touches[0] : e.targetTouches[0];
        startX = touch.pageX;
        startY = touch.pageY;
        active = true; // moved
        this.addEventListener('touchmove', onTouchMove, false);
        this.addEventListener('touchend', onTouchEnd, false);
    }

    function setup() {
        this.addEventListener && this.addEventListener('touchstart', onTouchStart, false);
    }

    $.event.special.swipe = {
        setup: setup
    };

    $.each(['left', 'up', 'down', 'right'], function() {
        $.event.special['swipe' + this] = {
            setup: function() {
                $(this).on('swipe', $.noop);
            }
        };
    });

    // PLUGIN DEFINITION
    // ==========================

    var old = $.fn.bootstrapTable
    $.fn.bootstrapTable = function() {
        old.apply(this, arguments);
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bootstrap.table.switch')
            if (!data) $this.data('bootstrap.table.switch', new BootstrapTableSwitch(this))
        })
    }

    $.extend($.fn.bootstrapTable, old);

}(jQuery);