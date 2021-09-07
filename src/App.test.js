import { render } from "@testing-library/react";
import { shallow } from "enzyme"
import Card from "./components/Card";
const book = {
   "key": "/works/OL3871697W",
   "title": "The Great Gatsby",
   "publish_date": [
     "2004 August"    
   ],
   "cover_i": 8432047,
   "author_name": [
     "F. Scott Fitzgerald"
   ]
 }
describe("Card component test", () => {

  it("matches snapshot", () => {
    const { asFragment } = render(<Card data={book} />);
    expect(asFragment()).toMatchSnapshot();
  })  
  it("does not render image", () => {
    const wrapper = shallow(<Card data={{}} />)
    expect(wrapper.find("Image").length).toBe(0)
  })
})