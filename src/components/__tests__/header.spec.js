import React from "react"
import renderer from "react-test-renderer"
import { render, fireEvent } from "@testing-library/react"
import Header from "../header"

const mockProps = {
  isOn: false,
  title: "Loser Kid",
  toggleTheme: jest.fn()
}

describe("Header", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Header {...mockProps} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

test('shows the children when the checkbox is checked', () => {
  const { getByText } = render(
    <Header {...mockProps} />,
  )

  expect(getByText(mockProps.title)).toBeInTheDocument()
})
