const deleteElements = () => {
  const iframe = document.querySelector('#tidio-chat-iframe');
  if (!iframe) {
      return
  }
  const elementsToDelete = iframe.contentDocument.querySelectorAll('.tidio-5hhiig');
  if (elementsToDelete) {
      elementsToDelete.forEach((element) => {
          element.remove();
      });
  }
};

setInterval(deleteElements, 50);
