const dateConvertFromTimestamp = (element) => {
  element.forEach(function (item, i, arr) {
    let date = new Date(item.reg_date * 1000);
    item.reg_date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  });
}

export default dateConvertFromTimestamp;