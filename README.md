# set-zero-timeout

setTimeout with true zero delay

## Motivation
Like [setTimeout], but without the 4 millisecond [minimum delay].

Why a timer with no time? The supplied callback will be bumped to the back
of the task queue. If other more critical tasks (like user interaction or
screen rendering) are already in the queue, they will be allowed to finish
first. But if the queue is empty, the setZeroTimeout callback will be executed
immediately.

This can be useful for splitting up long-running tasks across frames.
See [David Baron's blog post] for more on the motivation and methodology.

## Usage
set-zero-timeout is provided as an ESM import.
```javascript
import 'set-zero-timeout';
```

Importing the module adds two methods to the global scope.

### setZeroTimeout
This method's interface is just like [setTimeout] but without the `delay`
argument:
```javascript
var timeoutID = window.setTimeout(function);
var timeoutID = window.setTimeout(function, arg1, arg2, ...);
```

The returned ID is a positive integer that can be passed to clearZeroTimeout.

### clearZeroTimeout
Cancels a timer previously set up by setZeroTimeout. Syntax is similar to
[clearTimeout]:
```javascript
window.clearTimeout(timeoutID);
```

If the callback supplied to setZeroTimeout has already executed, or if the
ID supplied to clearTimeout is invalid, clearTimeout will silently do nothing.

[setTimeout]: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
[minimum delay]: https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
[David Baron's blog post]: https://dbaron.org/log/20100309-faster-timeouts
[clearTimeout]: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearTimeout
