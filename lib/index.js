'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = function () {
    return {
        noColors: false,
        startTime: null,
        afterErrorList: false,
        testCount: 0,
        skipped: 0,

        reportTaskStart: function reportTaskStart(startTime, userAgents, testCount) {
            var _this = this;

            this.startTime = startTime;
            this.testCount = testCount;

            this.setIndent(1).useWordWrap(true).write(this.chalk.bold('Running tests in:')).newline();

            userAgents.forEach(function (ua) {
                _this.write('- ' + _this.chalk.blue(ua)).newline();
            });
        },

        reportFixtureStart: function reportFixtureStart(name) {
            this.setIndent(1).useWordWrap(true);

            if (this.afterErrorList) this.afterErrorList = false;else this.newline();

            this.write(name).newline();
        },

        _renderErrors: function _renderErrors(errs) {
            var _this2 = this;

            this.setIndent(3).newline();

            errs.forEach(function (err, idx) {
                var prefix = _this2.chalk.red(idx + 1 + ') ');

                _this2.newline().write(_this2.formatError(err, prefix)).newline().newline();
            });
        },

        reportTestDone: function reportTestDone(name, testRunInfo) {
            var hasErr = !!testRunInfo.errs.length;
            var symbol = null;
            var nameStyle = null;

            if (testRunInfo.skipped) {
                this.skipped++;

                symbol = this.chalk.cyan('-');
                nameStyle = this.chalk.cyan;
            } else if (hasErr) {
                symbol = this.chalk.red.bold(this.symbols.err);
                nameStyle = this.chalk.red.bold;
            } else {
                symbol = this.chalk.green(this.symbols.ok);
                nameStyle = this.chalk.grey;
            }

            var title = symbol + ' ' + nameStyle(name);

            this.setIndent(1).useWordWrap(true);

            if (testRunInfo.unstable) title += this.chalk.yellow(' (unstable)');

            if (testRunInfo.screenshotPath) title += ' (screenshots: ' + this.chalk.underline.grey(testRunInfo.screenshotPath) + ')';

            this.write(title);

            if (hasErr) this._renderErrors(testRunInfo.errs);

            this.afterErrorList = hasErr;

            this.newline();
        },

        _renderWarnings: function _renderWarnings(warnings) {
            var _this3 = this;

            this.newline().setIndent(1).write(this.chalk.bold.yellow('Warnings (' + warnings.length + '):')).newline();

            warnings.forEach(function (msg) {
                _this3.setIndent(1).write(_this3.chalk.bold.yellow('--')).newline().setIndent(2).write(msg).newline();
            });
        },

        reportTaskDone: function reportTaskDone(endTime, passed, warnings) {
            var durationMs = endTime - this.startTime;
            var durationStr = this.moment.duration(durationMs).format('h[h] mm[m] ss[s]');
            var footer = passed === this.testCount ? this.chalk.bold.green(this.testCount + '/' + this.testCount + ' passed') : this.chalk.bold.red(this.testCount - passed + '/' + this.testCount + ' failed');

            footer += this.chalk.grey(' (' + durationStr + ')');

            if (!this.afterErrorList) this.newline();

            this.setIndent(1).useWordWrap(true);

            this.newline().write(footer).newline();

            if (this.skipped > 0) {
                this.write(this.chalk.cyan(this.skipped + ' skipped')).newline();
            }

            if (warnings.length) this._renderWarnings(warnings);
        }
    };
};

module.exports = exports['default'];