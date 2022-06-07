import KanbanAPI from "../api/kanbanAPI.js"

export default class DropZone {
    static createDropZone() {
        const range = document.createRange()

        range.selectNode(document.body)

        const dropZone = range.createContextualFragment(`
        <div class="kanban-dropzone"></div>
        `).children[0]

        
        dropZone.addEventListener("dragover", e => {
            e.preventDefault()
            dropZone.classList.add("kanban-dropzone--active")
            
        })
        
        dropZone.addEventListener("dragleave", e => {
            dropZone.classList.remove("kabban-dropzone--active")
        })

        dropZone.addEventListener("drop", e => {
            e.preventDefault()
            dropZone.classList.remove("kanban-dropzone--active")

            const columnElement = dropZone.closest(".kanban-col")
            const columnId = Number(columnElement.dataset.id)
            const dropZonesInColumn = Array.from(columnElement.querySelectorAll(".kanban-dropzone"))
            const droppedIndex = dropZonesInColumn.indexOf(dropZone)
            const itemId = Number(e.dataTransfer.getData("text/plain"))
            const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`)
            const insertAfter = dropZone.parentElement.classList.contains("kanban-item") ? dropZone.parentElement : dropZone
            // insertAfter.after(droppedItemElement)
            if (droppedItemElement.contains(dropZone)) {
                return;
            }

            insertAfter.after(droppedItemElement)
            KanbanAPI.updateItem(itemId, {
                columnId,
                position: droppedIndex
            })
            console.log(droppedItemElement)
        })
        return dropZone
    }
}
