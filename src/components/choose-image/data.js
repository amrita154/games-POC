import Apple from "./assets/images/apple.png";
import Banana from "./assets/images/bananas.png";
import Orange from "./assets/images/fruit.png";
import Kiwi from "./assets/images/kiwi.png";
import Grapes from "./assets/images/grapes.png";
import Strawberry from "./assets/images/strawberry.png";


const dummyData = [
  {
    id: 1,
    name: "Apple",
    image:[ Apple,Banana,Orange],
    correctImage:0
  },
  {
    id: 2,
    name: "banana",
    image:Banana,
     image: [Apple,Banana,Orange],
    correctImage:1
  },
  {
    id: 3,
    name: "orange",
    image:[ Apple,Banana,Orange],
    correctImage:2
  },
  {
    id: 4,
    name: "kiwi",
   image:[ Kiwi,Banana,Orange],
    correctImage:0
  },
  {
    id: 5,
    name: "grapes",
   image:[ Apple,Banana,Grapes],
    correctImage:2
  },
  {
    id: 6,
    name: "strawberry",
   image:[ Apple,Strawberry,Orange],
    correctImage:1
  },
];

export default dummyData;
