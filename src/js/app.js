import {
  NORTH,
  SOUTH,
  EAST,
  WEST,
} from './constants';
import { parseCommand, parseTarget } from './parser';

const mainInput = document.getElementById('main-input');
const messageList = document.getElementById('message-list');
const mapSize = 5;
/*
const moveCounter = document.getElementById('move-counter');
let moves = 0;
*/


const createMessage = (text, type) => {
  const newMessage = document.createElement('p');
  const messageClass = type === 'system' ? 'system-message' : 'user-message';
  newMessage.classList.add('message');
  newMessage.classList.add(messageClass);
  newMessage.innerHTML = text;
  messageList.appendChild(newMessage);
};

class Location {
  constructor(props) {
    this.coordinates = props.coordinates;
    this.description = props.description;
  }
}

const generateMap = (size) => {
  const map = [];
  // eslint-disable-next-line
  for (let i = 0; i < size; i++) {
    const subMap = [];

    // eslint-disable-next-line
    for (let j = 0; j < size; j++) {
      const location = new Location({ coordinates: { x: j, y: i }, description: `This is location ${j}, ${i}` });
      subMap.push(location);
    }
    map.push(subMap);
  }

  return map;
};

const map = generateMap(mapSize);

class Player {
  constructor(props) {
    this.moves = props.moves || 0;
    this.activeLocation = null;
    this.location = {
      x: 0,
      y: 0,
    };
    this.bags = 0;
    this.inventory = [];
  }

  useItem(target) {
    if (target.usable) {
      target.use();
      const newInventory = this.inventory.filter(x => target.key !== x.key);
      this.inventory = [...newInventory];
    }
  }

  move(direction) {
    switch (direction) {
      case NORTH: {
        if (this.location.x < mapSize - 1) {
          this.location.x += 1;
          this.enterLocation();
        } else {
          createMessage('There is nothing further north.', 'system');
        }
        break;
      }
      case SOUTH: {
        if (this.location.x > 0) {
          this.location.x -= 1;
          this.enterLocation();
        } else {
          createMessage('There is nothing further south.', 'system');
        }
        break;
      }
      case EAST: {
        if (this.location.y < mapSize - 1) {
          this.location.y += 1;
          this.enterLocation();
        } else {
          createMessage('There is nothing further east.', 'system');
        }
        break;
      }
      case WEST: {
        if (this.location.y > 0) {
          this.location.y -= 1;
          this.enterLocation();
        } else {
          createMessage('There is nothing further west.', 'system');
        }
        break;
      }
      default:
        createMessage('That isn\'t a valid direction.', 'system');
        break;
    }
    console.log(this.location);
  }

  enterLocation() {
    const { x, y } = { ...this.location };
    createMessage(map[x][y].description, 'system');
  }
}

class Item {
  constructor(props) {
    this.description = props.description;
    this.key = props.key;
    this.usable = props.usable;
    this.useMessage = props.useMessage;
  }

  use() {
    if (this.usable) {
      createMessage(this.useMessage, 'system');
    }
  }
}

const playerController = new Player({ moves: 0 });
const testItem = new Item({
  description: 'This is a test item',
  key: 'test',
  usable: true,
  useMessage: 'You activate the test item',
});

playerController.inventory = [testItem];

const userInputHandler = (input) => {
  createMessage(input, 'user');
  const command = parseCommand(input);

  switch (command) {
    case 'move': {
      const direction = parseTarget(input, [NORTH, SOUTH, EAST, WEST]);
      playerController.move(direction);
      break;
    }
    case 'activate': {
      const inventoryKeys = playerController.inventory.map(item => item.key);
      const target = parseTarget(input, inventoryKeys);
      const targetItem = playerController.inventory.filter(item => target === item.key)[0];
      if (target !== null) {
        playerController.useItem(targetItem);
      } else {
        createMessage('That doesn\'t seem to be a real item.', 'system');
      }
      break;
    }
    default:
      break;
  }
};

const onUserKeyUp = (e) => {
  const input = e.target.value;

  // keyCode 13 is the enter key
  if (e.keyCode === 13 && input) {
    userInputHandler(input);
    e.target.value = '';
  }
};


/* Main execution tasks */
mainInput.addEventListener('keyup', e => onUserKeyUp(e));
