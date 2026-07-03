let draggedTask = null;

document.querySelectorAll('.task').forEach((task) => {
  task.addEventListener('dragstart', () => {
    draggedTask = task;
    task.classList.add('dragging');
  });

  task.addEventListener('dragend', () => {
    task.classList.remove('dragging');
    draggedTask = null;
  });
});

document.querySelectorAll('.drop-zone').forEach((zone) => {
  zone.addEventListener('dragover', (event) => {
    event.preventDefault();
    zone.classList.add('drag-over');
  });

  zone.addEventListener('dragleave', () => {
    zone.classList.remove('drag-over');
  });

  zone.addEventListener('drop', async (event) => {
    event.preventDefault();
    zone.classList.remove('drag-over');

    if (!draggedTask) return;

    const taskId = draggedTask.dataset.id;
    const status = zone.dataset.status;
    zone.appendChild(draggedTask);

    const response = await fetch(`/tasks/${taskId}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });

    if (!response.ok) {
      alert('Could not update task status. Reloading.');
      window.location.reload();
      return;
    }

    const select = draggedTask.querySelector('select[name="status"]');
    if (select) select.value = status;
  });
});
