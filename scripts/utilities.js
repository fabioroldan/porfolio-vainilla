function today() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();
  // format 1234-01-01
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }

  return yyyy + '-' + mm + '-' + dd;
}

async function getImgFile(e) {
  const pickerOpts = {
    types: [
      {
        description: 'Images',
        accept: {
          'image/*': ['.png', '.gif', '.jpeg', '.jpg', '.webp', '.svg']
        }
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false
  };
  // open file picker
  let [fileHandle] = await window.showOpenFilePicker(pickerOpts);

  // get file contents
  const fileData = await fileHandle.getFile();
  let imgPath = 'images/' + fileData.name;
  e.target.value = imgPath;
  let $container = document.createElement("div");
  $container.innerHTML = ` <div class="file-thumbnail">
  <img  src="${imgPath}" width="100"/>
</div>`;
  e.target.after($container);
  return imgPath;
}

function getDomainWithoutSuffix(url) {
  let domain = new URL(url);
  let secondLevelDomain = (domain.host.match(/([^.]+)\.\w{2,3}(?:\.\w{2})?$/) || [])[1];
  return secondLevelDomain;
}

export { today, getImgFile, getDomainWithoutSuffix };