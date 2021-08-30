/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render,fireEvent,waitFor,screen} from "@testing-library/react"
import Header from "../components/Header";
import {RouterEvent,useRouter} from "next/router"
import { StateMock } from '@react-mock/state';
import "@testing-library/jest-dom/extend-expect";

beforeEach(()=>{
  //const component = render(<Header />);
  //comp = component;
const renderComponent = ({ startDate, endDate }) =>
render(
  <StateMock state={{ startDate, endDate }}>
    <Header />
  </StateMock>
);
return renderComponent({ startDate: new Date(),endDate: new Date() });
})

it("test search input", function() {
  const searchInput= screen.getByTestId("search-input");
  expect(searchInput.value).toBe("");

  fireEvent.change(searchInput,{
    target:{
      value:"miami"
    }
  })
  expect(searchInput.value).toBe("miami");
})


it("test number of guest input",async ()=>{
  const searchInput = screen.getByTestId("search-input");
  fireEvent.change(searchInput,{
    target:{
      value:"london"
    }
  })

  
 const numberOfGuestInput = await screen.findByTestId('number-guest')
 expect(numberOfGuestInput.value).toBe("1")
  fireEvent.change(numberOfGuestInput,{
  target:{
    value: 2
  }
  })
 expect(numberOfGuestInput.value).toBe("2")
})

// it("test if the url change with the correct data",async ()=>{
//   const searchInput = screen.getByTestId("search-input");
//   fireEvent.change(searchInput,{
//     target:{
//       value:"london"
//     }
//   })

  
//  const searchBtn = await screen.findByTestId('search-btn')
//   fireEvent.click(searchBtn,{
    
//   })

//  //expect
// })