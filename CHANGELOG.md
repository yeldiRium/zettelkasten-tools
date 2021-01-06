# [3.0.0](https://github.com/yeldirium/zettelkasten-tools/compare/v2.3.0...v3.0.0) (2021-01-06)


### Bug Fixes

* Fix test for daily-link template. ([9e83074](https://github.com/yeldirium/zettelkasten-tools/commit/9e830743117f42aeade6ec1d199061c95f04f5a8))
* Remove daily tag from daily-link template. ([cd6b8db](https://github.com/yeldirium/zettelkasten-tools/commit/cd6b8dba1db3ea25c15a283b0d443276224bbbd5))


### Features

* Add --output-directory option to new command. ([#4](https://github.com/yeldirium/zettelkasten-tools/issues/4)) ([6246f3d](https://github.com/yeldirium/zettelkasten-tools/commit/6246f3d15155a9aa332087fd6a117b70ddde3619))
* Make a date format function available to templates. ([9e06d8b](https://github.com/yeldirium/zettelkasten-tools/commit/9e06d8bf53be8182a2fc4d636ef1d64cf407effb))
* Output absolute file path instead of just file name. ([b9ad6e2](https://github.com/yeldirium/zettelkasten-tools/commit/b9ad6e2fdf2d1b09e6eded86a1988703b648773e))


### BREAKING CHANGES

* This changes the output behavior of the new command.

# [2.3.0](https://github.com/yeldirium/zettelkasten-tools/compare/v2.2.0...v2.3.0) (2021-01-05)


### Features

* Add another date format to templates. ([8d4ef3f](https://github.com/yeldirium/zettelkasten-tools/commit/8d4ef3f345eb71e18acd16d0446b5337a8efa940))

# [2.2.0](https://github.com/yeldirium/zettelkasten-tools/compare/v2.1.0...v2.2.0) (2021-01-04)


### Features

* Find and use user-defined templates. ([#3](https://github.com/yeldirium/zettelkasten-tools/issues/3)) ([429f2c3](https://github.com/yeldirium/zettelkasten-tools/commit/429f2c3dcd44abdb0f6006a0271560f1fb0bc439))

# [2.1.0](https://github.com/yeldirium/zettelkasten-tools/compare/v2.0.0...v2.1.0) (2020-12-26)


### Bug Fixes

* Format hours in 24-hour format in iso. ([b6efa40](https://github.com/yeldirium/zettelkasten-tools/commit/b6efa400a7bbf321c23360defd0bd01e75b5c53e))


### Features

* Add daily-link template and additional data for templating. ([a14b649](https://github.com/yeldirium/zettelkasten-tools/commit/a14b649133e4ebc4b2e88f0cac0993a53ec54968))

# [2.0.0](https://github.com/yeldirium/zettelkasten-tools/compare/v1.2.0...v2.0.0) (2020-12-21)


* feat!: Implement --template option for new command. ([2802d83](https://github.com/yeldirium/zettelkasten-tools/commit/2802d83717620629446ade6a953b88faf2d9c5f8))


### BREAKING CHANGES

* This reworks the CLI verbosity configuration. It replace the --quiet
option with the more appropriate --no-interaction option, as well as
respecting wether stdout is being piped or not.

# [1.2.0](https://github.com/yeldirium/zettelkasten-tools/compare/v1.1.0...v1.2.0) (2020-12-20)


### Features

* Implement `templates` command. ([6f65fda](https://github.com/yeldirium/zettelkasten-tools/commit/6f65fda28cd438405b420fa3befd7e318cb8e7a3))

# [1.1.0](https://github.com/yeldirium/zettelkasten-tools/compare/v1.0.0...v1.1.0) (2020-12-19)


### Features

* Add `new` command that creates zettel from default template. ([1f6b317](https://github.com/yeldirium/zettelkasten-tools/commit/1f6b31778d6659296b744172991a646d40cc90dc))

# 1.0.0 (2020-12-18)


### Features

* Prepare CLI structure. ([ab04725](https://github.com/yeldirium/zettelkasten-tools/commit/ab04725d3524dbd257a2963078e46ad46d4412f7))
