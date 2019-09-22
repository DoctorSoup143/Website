  $(document).ready(function() {

    var tabsModule = {

      config: {
        "currentSlide": 0,
        "numSlides": $(".contentPanel").length,
        "module": $(".tabsWrap"),
        "listBtn": $(".tabs li"),
        "content": $(".contentPanel"),
        "gradient": $(".gradientWrap"),
        "closeContent": $(".closeContent"),
        "mobileArrowLeft": $(".mobile-arrows .arrow-left"),
        "mobileArrowRight": $(".mobile-arrows .arrow-right")
      },

      // debounce
      debounce: function(fn, delay) {
        var timer = null;
        return function() {
          var context = this,
            args = arguments;
          clearTimeout(timer);
          timer = setTimeout(function() {
            fn.apply(context, args);
          }, delay);
        };
      },

      animate: function() {
        tabsModule.config.module.find(".contentPanel.active").addClass("is-animating");
        setTimeout(function() {
          tabsModule.config.content.removeClass("is-animating active");
          tabsModule.config.content.eq(tabsModule.config.currentSlide).addClass("active");
        }, 300);
      },

      clickTab: function() {

        tabsModule.config.listBtn.on("click", tabsModule.debounce(function(event) {

          // Active Tab State
          tabsModule.config.listBtn.not(this).toggleClass("active", false);
          $(this).toggleClass("active", true);

          tabsModule.config.currentSlide = $(this).index();

          // Active Content Panel State

          tabsModule.animate();

          // Active Gradient State
          tabsModule.config.gradient.removeClass("active");
          tabsModule.config.gradient.eq(tabsModule.config.currentSlide).addClass("active");

        }, 300));
      },

      clickMobileArrow: function() {

        tabsModule.config.mobileArrowLeft.on("click", tabsModule.debounce(function(event) {
          if (tabsModule.config.currentSlide <= tabsModule.config.numSlides - 1 && tabsModule.config.currentSlide > 0) {
            tabsModule.config.currentSlide--;
            tabsModule.animate();
          }
        }, 300));

        tabsModule.config.mobileArrowRight.on("click", tabsModule.debounce(function(event) {
          if (tabsModule.config.currentSlide < tabsModule.config.numSlides - 1 && tabsModule.config.currentSlide >= 0) {
            tabsModule.config.currentSlide++;
            tabsModule.animate();
          }
        }, 300));
      }

    }

    tabsModule.clickTab();
    tabsModule.clickMobileArrow();

  });