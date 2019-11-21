import BlueUI from "blue-ui-lib";
export default () => {
  BlueUI.initDict({
    select: [
      { title: "选择1", key: "a1", other: "其他值" },
      { title: "选择2", key: "a2" },
      { title: "选择3", key: "a3" }
    ],
    simple: {
      1: "苹果",
      2: "梨子",
      3: "香蕉",
      4: "橙子",
      5: "樱桃",
      6: "超长超长超长超长超长超长超长超长超长超长超长超长超长"
    }
  });
};
