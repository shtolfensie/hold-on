# Hold on

A brave (chromium) plugin which adds a delay before opening a website.

## Installation

This plugin can currently only be installed as an unpacked dev plugin.
Steps to install it in your browser (replace `brave` with your browser):

1. go to the [`extensions`](brave://extensions) page
2. enabled `Developer mode`
3. click on `Load unpacked` and select the plugin directory.


## TODO

- [ ] migrate to manifest v3
- [ ] configurable list of website to delay
- [ ] pop-up window with overview info
- [ ] settings page
- [ ] catch in-place URL navigation (SPA style routers)
- [ ] count website visits
- [ ] count time spent on website
- [ ] add breathing animation to delay page
- [ ] add "abort" button to delay page
- [ ] delay page extensions
    - make it possible to display arbitrary components on the delay page
    - e.g. TODO list, agenda (calendar), number of visits, list of open projects, ...
- [ ] add option to progressively lengthen the delay (based on number of visits, time spent, ...)
