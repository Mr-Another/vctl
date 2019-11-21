const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const WebpackBar = require("webpackbar");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const md = require("markdown-it")();

const striptags = require("./strip-tags");
const slugify = require("transliteration").slugify;
const toc = require("markdown-it-table-of-contents");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, function($0) {
    return String.fromCharCode(
      parseInt(
        encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, "$2"),
        16
      )
    );
  });
  return str;
}

function wrap(render) {
  return function() {
    return render
      .apply(this, arguments)
      .replace('<code v-pre class="', '<code class="hljs ')
      .replace("<code>", '<code class="hljs">');
  };
}

const vueMarkdown = {
  loader: "vue-markdown-loader/lib/markdown-compiler",
  options: {
    raw: true,
    preventExtract: true,
    preprocess: function(MarkdownIt, source) {
      MarkdownIt.renderer.rules.table_open = function() {
        return '<table class="table">';
      };
      MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence);
      return source;
    },
    use: [
      [
        require("markdown-it-anchor"),
        {
          level: 2,
          slugify: slugify,
          permalink: true,
          permalinkBefore: true,
          permalinkSymbol: "#"
        }
      ],
      [
        toc,
        {
          slugify: slugify,
          includeLevel: [2, 3]
        }
      ],
      [
        require("markdown-it-container"),
        "demo",
        {
          validate: function(params) {
            return params.trim().match(/^demo\s*(.*)$/);
          },

          render: function(tokens, idx) {
            var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
            if (tokens[idx].nesting === 1) {
              var description = m && m.length > 1 ? m[1] : "";

              var content = tokens[idx + 1].content;
              var html = convert(
                striptags.strip(content, ["script", "style"])
              ).replace(/(<[^>]*)=""(?=.*>)/g, "$1");

              var script = striptags.fetch(content, "script");
              var style = striptags.fetch(content, "style");
              var jsfiddle = { html: html, script: script, style: style };
              var descriptionHTML = description ? md.render(description) : "";
              jsfiddle = md.utils.escapeHtml(JSON.stringify(jsfiddle));

              return `<demo-block class="demo-box" :jsfiddle="${jsfiddle}">
                                <div class="source" slot="source">${html}</div>
                                ${descriptionHTML}
                                <div class="highlight" slot="highlight">`;
            }
            return "</div></demo-block>\n";
          }
        }
      ],
      [require("markdown-it-container"), "tip"],
      [require("markdown-it-container"), "warning"]
    ]
  }
};

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "js/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "vue-loader"
          },
          vueMarkdown
        ]
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"]
      },
      {
        test: /\.yml$/,
        loader: "json-loader!yaml-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV !== "production"
            ? "vue-style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "images/[name].[hash:7].[ext]" // 将图片都放入 images 文件夹下，[hash:7]防缓存
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "fonts/[name].[hash:7].[ext]" // 将字体放入 fonts 文件夹下
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve(__dirname, "../"),
      "blue-ui-lib": path.resolve(__dirname, "../src/index.js"),
      "blue-ui-style": path.resolve(__dirname, "../themes/index.less")
    },
    extensions: ["*", ".js", ".vue", ".json"],
    symlinks: false
  },
  performance: {
    hints: false
  },
  plugins: [new VueLoaderPlugin(), new WebpackBar()]
};
