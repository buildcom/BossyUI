Toast vs Notification: Toast is quicker to type and more hipster therefore more likely to be adopted.

  // The idea for a BossyController is one universal controller the user includes that gives them access
  // to functions that are part of the core bossy widgets, as well as give the bossy widgets
  // a universal scope to use for persistence throughout the app. For example, 
  // if someone has more than one toast in the timeout then we need to accomodate
  // a stack of toasts that will timeout as needed.
  // Option #2 would be to use a "Toaster" directive that wraps around the toast and manages
  // from that perspective. Also a valid solution, potentially more extensible. and also funny.
  // Need a timeleft instead of totalTime check!