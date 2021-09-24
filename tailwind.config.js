module.exports = {
  purge: [],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        "reverse-one-ping": 'ping 1.5s linear reverse',
        "reverse-one-ping-delay": 'ping 1.5s 1.5s linear reverse',
      },
      height: {
        20: "2000px"

      },
      minWidth: {
        1024: "1024px"
      },
      padding: {
        "x5vw": "0 5vw 0 5vw",
        "x10vw": "0 10vw 0 10vw",
        "x15vw": "0 15vw 0 15vw"
      },
      gridTemplateColumns: {
        "auto-150": "repeat(auto-fill,150px);",
        "auto-75": "repeat(auto-fill,75px);"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
