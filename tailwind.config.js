/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        clifford: "#da373d",
      },
      screens: {
        "3xl": "1600px",
        "4xl": "1920px",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      const groupVariantPrefixes = ["p1", "p2", "p3"];

      function escapeClassName(className) {
        return className
          .replace(/\[/g, "\\[") // '['를 이스케이프
          .replace(/\]/g, "\\]") // ']'를 이스케이프
          .replace(/\#/g, "\\#") // '#'를 이스케이프
          .replace(/\//g, "\\/"); // '/'를 이스케이프 (필요한 경우)
      }
      // group-on 변형 추가 함수
      const addGroupOnVariant = (name = "") => {
        const selector = name ? `group\\/${name}` : "group";
        const variantName = name ? `group-on/${name}` : "group-on";
        addVariant(variantName, ({ modifySelectors }) => {
          modifySelectors(({ className }) => {
            return `.${selector}.on .${escapeClassName(
              variantName
            )}\\:${escapeClassName(className)}`;
          });
        });
      };
      // peer-on 변형 추가 함수
      const addPeerOnVariant = (name = "") => {
        const selector = name ? `peer\\/${name}` : "peer";
        const variantName = name ? `peer-on/${name}` : "peer-on";
        addVariant(variantName, ({ modifySelectors }) => {
          modifySelectors(({ className }) => {
            return `.${selector}.on ~ .${escapeClassName(
              variantName
            )}\\:${escapeClassName(className)}`;
          });
        });
      };
      // 기본 group-on, peer-on 변형 추가
      addGroupOnVariant();
      addPeerOnVariant();
      // 특정 그룹과 피어에 대한 변형 추가
      groupVariantPrefixes.forEach((name) => {
        addGroupOnVariant(name);
        addPeerOnVariant(name);
      });
      // on 클래스에 대한 변형 추가
      addVariant("on", ({ modifySelectors }) => {
        modifySelectors(({ className }) => {
          return `.on.on\\:${escapeClassName(className)}`;
        });
      });
    },
  ],
};
