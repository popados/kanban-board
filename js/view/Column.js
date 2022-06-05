import KanbanAPI from "../api/kanbanAPI.js"
import Item from "./Item.js"

export default class Column {
    constructor(id, title) {
        this.elements = {}
        this.elements.root = Column.createRoot()
        this.elements.title = this.elements.root.querySelector(".kanban-col-title")
        this.elements.items = this.elements.root.querySelector(".kanban-col-items")
        this.elements.addItem = this.elements.root.querySelector(".kanban-add-item")

        this.elements.root.dataset.id = id
        this.elements.title.textContent = title

        this.elements.addItem.addEventListener("click", () => {

        })
        KanbanAPI.getItems(id).forEach(item => {
            console.log(item)
            this.renderItem(item)
        })


    }

    static createRoot() {
        const range = document.createRange()

        range.selectNode(document.body)

        return range.createContextualFragment(`
            <div class="kanban-col">
                <div class="kanban-col-title"></div>
                <div class="kanban-col-items"></div>
                <button class="kanban-add-item" type="button"> + Add</button>
            </div>
        `).children[0]
    }

    renderItem(data) {
        const item = new Item (data.id, data.content)

        this.elements.items.appendChild(item.elements.root)

    }


}