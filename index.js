initZeroTimeouts();

function initZeroTimeouts() {
  // setTimeout with true zero delay. https://github.com/GlobeletJS/zero-timeout
  const timeouts = [];
  let taskId = 0;

  // Make a unique message, that won't be confused with messages from
  // other scripts or browser tabs
  const messageKey = "zeroTimeout_$" + Math.random().toString(36).slice(2);

  // Make it clear where the messages should be coming from
  const { protocol, hostname, port } = window.location;
  let targetOrigin = protocol + "//" + hostname;
  if (port !== "") targetOrigin += ":" + port;

  // When a message is received, execute a timeout from the list
  window.addEventListener("message", evnt => {
    if (evnt.source != window || evnt.data !== messageKey) return;
    evnt.stopPropagation();

    const task = timeouts.shift();
    if (!task || task.canceled) return;
    task.func(...task.args);
  }, true);

  // Now define the external functions to set or cancel a timeout
  window.setZeroTimeout = function(func, ...args) {
    taskId += 1;
    timeouts.push({ id: taskId, func, args });
    window.postMessage(messageKey, targetOrigin);
    return taskId;
  };

  window.clearZeroTimeout = function(id) {
    const task = timeouts.find(timeout => timeout.id === id);
    if (task) task.canceled = true;
  };
}
