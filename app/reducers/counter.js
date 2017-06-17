export default function(state = 0, action) { // Set up a default state of 0
  switch(action.type) {
  case 'INCREMENT': //
    return state + 1;
  }
  return state;
}
