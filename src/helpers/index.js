export const getBuffer = () => {
  let buffer = [];

  function add(raw) {
    buffer = buffer.concat(...raw);
    return buffer;
  }

  /**
   * reset buffer
   */
  function newBuffer() {
    buffer = [];
  }

  return {
    reset: function () {
      newBuffer();
    },
    addData: function (raw) {
      return add(raw);
    },
    getData: function () {
      return buffer;
    },
  };
};
