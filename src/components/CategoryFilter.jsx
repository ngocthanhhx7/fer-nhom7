"use client"

import { ListGroup } from "react-bootstrap"

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <ListGroup>
      <ListGroup.Item
        action
        active={selectedCategory === "all"}
        onClick={() => onSelectCategory("all")}
        className="d-flex justify-content-between align-items-center"
      >
        All Categories
      </ListGroup.Item>

      {categories.map((category, index) => (
        <ListGroup.Item
          key={index}
          action
          active={selectedCategory === category}
          onClick={() => onSelectCategory(category)}
          className="d-flex justify-content-between align-items-center"
        >
          {category}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

