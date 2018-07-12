const actions = {
  move: ['move', 'head', 'walk', 'run'],
  activate: ['open', 'use', 'interact', 'consume', 'activate'],
  pickup: ['pick up', 'take', 'collect', 'bring', 'add'],
  inspect: ['inspect', 'look closer', 'look'],
};
const actionKeys = Object.keys(actions);

const parseCommand = (input) => {
  const cleansedInput = input.toLowerCase().trim();
  let command = null;

  // parse out potential action
  actionKeys.forEach((key) => {
    actions[key].forEach((variation) => {
      if (cleansedInput.includes(variation)) {
        command = key;
      }
    });
  });

  // parse out potential target

  return command;
};

const parseTarget = (input, entities) => {
  const cleansedInput = input.toLowerCase().trim();
  let target = null;

  entities.forEach((entity) => {
    if (cleansedInput.includes(entity)) {
      target = entity;
    }
  });

  return target;
};

export { parseCommand, parseTarget };
