<template>
  <div class="share_buttons">
    <div class="article_meta">
      <a class="share-twitter" :href="twitterUrl()" target="_blank" title="ツイッターで共有">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="350px" height="300px" viewBox="0 0 350 300"><path class="fill_tw" d="M350.001,35.509 C346.026,42.167 340.649,49.197 333.870,56.595 C328.493,62.513 321.944,68.556 314.231,74.720 C314.231,74.720 314.231,76.940 314.231,76.940 C314.231,76.940 314.231,79.530 314.231,79.530 C314.231,80.762 314.346,81.626 314.579,82.119 C314.579,82.119 314.579,84.708 314.579,84.708 C314.579,110.109 310.022,135.572 300.903,161.097 C291.785,186.620 278.809,209.494 261.975,229.715 C243.971,251.417 222.113,268.556 196.394,281.134 C170.674,293.711 141.917,299.999 110.122,299.999 C89.546,299.999 70.142,297.041 51.904,291.122 C33.201,285.202 15.899,276.818 -0.001,265.967 C0.936,266.214 2.337,266.338 4.208,266.338 C7.948,266.831 10.755,267.077 12.626,267.077 C12.626,267.077 17.183,267.077 17.183,267.077 C33.550,267.077 49.567,264.242 65.231,258.569 C79.727,253.144 93.403,245.253 106.263,234.895 C91.300,234.649 77.387,229.469 64.531,219.357 C51.904,209.494 43.486,197.040 39.279,181.997 C42.786,182.737 45.007,183.105 45.943,183.105 C45.943,183.105 49.447,183.105 49.447,183.105 C50.151,183.352 51.202,183.476 52.605,183.476 C54.708,183.476 56.346,183.352 57.516,183.105 C59.853,183.105 63.128,182.612 67.335,181.626 C67.801,181.626 68.505,181.502 69.439,181.256 C70.376,181.009 71.075,180.887 71.542,180.887 C54.941,177.434 41.265,168.679 30.509,154.622 C19.520,140.565 14.029,124.536 14.029,106.534 C14.029,106.534 14.029,106.163 14.029,106.163 C14.029,106.163 14.029,105.794 14.029,105.794 C14.029,105.794 14.029,105.424 14.029,105.424 C18.471,108.383 23.615,110.603 29.460,112.082 C35.538,114.054 41.265,115.042 46.644,115.042 C36.354,107.644 28.640,98.642 23.497,88.038 C17.651,77.187 14.729,65.102 14.729,51.786 C14.729,44.388 15.546,37.729 17.183,31.810 C18.120,27.617 20.457,21.576 24.198,13.685 C42.435,37.358 64.177,55.854 89.429,69.172 C115.382,83.475 142.969,91.366 172.195,92.847 C171.494,87.667 171.145,84.832 171.145,84.339 C170.674,80.886 170.441,78.051 170.441,75.830 C170.441,54.868 177.456,36.989 191.483,22.193 C205.512,7.396 222.462,-0.002 242.337,-0.002 C252.623,-0.002 262.325,2.094 271.444,6.286 C280.562,10.971 288.394,16.891 294.942,24.042 C302.423,22.315 310.372,19.850 318.788,16.644 C325.803,13.931 333.051,10.232 340.532,5.547 C337.729,14.424 333.634,22.439 328.260,29.591 C322.179,36.989 315.751,42.907 308.969,47.347 C315.984,46.113 322.999,44.634 330.010,42.907 C335.388,41.428 342.052,38.961 350.001,35.509 Z"/>
        </svg><span>ツイートする</span>
      </a>
    </div>
    <div class="article_meta">
      <a class="share-hatebu" :href="hatebuUrl()" target="_blank" title="はてなブックマークで共有">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="355.004" height="300" viewBox="0 0 355.004 300">
          <g>
            <path class="fill_b" d="M280.009,0h70v200.005h-70V0z"/>
            <path class="fill_b" d="M215.192,160.596c-11.844-13.239-28.314-20.683-49.443-22.288 c18.795-5.122,32.443-12.616,41.077-22.628c8.593-9.88,12.856-23.292,12.856-40.171c0-13.362-2.922-25.184-8.579-35.397 c-5.805-10.152-14.14-18.276-25.102-24.357c-9.586-5.274-20.98-8.994-34.262-11.188c-13.349-2.126-36.709-3.198-70.231-3.198H0 V298.63h83.976c33.737,0,58.064-1.182,72.94-3.441c14.863-2.337,27.334-6.27,37.428-11.662 c12.484-6.587,22.007-15.964,28.662-28.01c6.698-12.085,10.014-26.02,10.014-41.956 C233.017,191.514,227.079,173.798,215.192,160.596z M75.26,67.27h17.398c20.108,0,33.617,2.267,40.59,6.787 c6.877,4.542,10.388,12.38,10.388,23.547c0,10.745-3.733,18.313-11.118,22.751c-7.483,4.354-21.117,6.562-41.079,6.562H75.26 V67.27z M144.276,237.733c-7.916,4.862-21.557,7.251-40.696,7.251H75.265v-64.949h29.54c19.654,0,33.243,2.475,40.469,7.414 c7.343,4.942,10.955,13.665,10.955,26.191C156.226,224.85,152.263,232.899,144.276,237.733z"/>
            <path class="fill_b" d="M315.014,220.003c-22.101,0-40.002,17.891-40.002,39.991 c0,22.1,17.902,40.006,40.002,40.006c22.072,0,39.99-17.906,39.99-40.006C355.004,237.894,337.088,220.003,315.014,220.003z"/>
          </g>
        </svg><span>はてブで共有する</span>
      </a>
    </div>
    <div class="article_meta">
      <a class="share-line" :href="lineUrl()" target="_blank" title="LINEで共有">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="315px" height="300px" viewBox="0 0 315 300">
          <g>
            <path class="fill_li_1" d="M280.344,206.351 C280.344,206.351 280.354,206.351 280.354,206.351 C247.419,244.375 173.764,290.686 157.006,297.764 C140.251,304.844 142.724,293.258 143.409,289.286 C143.809,286.909 145.648,275.795 145.648,275.795 C146.179,271.773 146.725,265.543 145.139,261.573 C143.374,257.197 136.418,254.902 131.307,253.804 C55.860,243.805 0.004,190.897 0.004,127.748 C0.004,57.307 70.443,-0.006 157.006,-0.006 C243.579,-0.006 314.004,57.307 314.004,127.748 C314.004,155.946 303.108,181.342 280.344,206.351 Z"/>
            <path class="fill_li_2" d="M253.185,121.872 C257.722,121.872 261.408,125.569 261.408,130.129 C261.408,134.674 257.722,138.381 253.185,138.381,C253.185,138.381 230.249,138.381 230.249,138.381 C230.249,138.381 230.249,153.146 230.249,153.146 C230.249,153.146 253.185,153.146 253.185,153.146 C257.710,153.146 261.408,156.851 261.408,161.398 C261.408,165.960 257.710,169.660 253.185,169.660 C253.185,169.660 222.018,169.660 222.018,169.660 C217.491,169.660 213.795,165.960 213.795,161.398 C213.795,161.398 213.795,130.149 213.795,130.149 C213.795,130.139 213.795,130.139 213.795,130.129 C213.795,130.129 213.795,130.114 213.795,130.109 C213.795,130.109 213.795,98.878 213.795,98.878 C213.795,98.858 213.795,98.850 213.795,98.841 C213.795,94.296 217.486,90.583 222.018,90.583 C222.018,90.583 253.185,90.583 253.185,90.583 C257.722,90.583 261.408,94.296 261.408,98.841 C261.408,103.398 257.722,107.103 253.185,107.103 C253.185,107.103 230.249,107.103 230.249,107.103 C230.249,107.103 230.249,121.872 230.249,121.872 C230.249,121.872 253.185,121.872 253.185,121.872 ZM202.759,161.398 C202.759,164.966 200.503,168.114 197.135,169.236 C196.291,169.521 195.405,169.660 194.526,169.660 C191.956,169.660 189.502,168.431 187.956,166.354 C187.956,166.354 156.012,122.705 156.012,122.705 C156.012,122.705 156.012,161.398 156.012,161.398 C156.012,165.960 152.329,169.660 147.791,169.660 C143.256,169.660 139.565,165.960 139.565,161.398 C139.565,161.398 139.565,98.841 139.565,98.841 C139.565,95.287 141.829,92.142 145.192,91.010 C146.036,90.730 146.915,90.583 147.799,90.583 C150.364,90.583 152.828,91.818 154.366,93.894 C154.366,93.894 186.310,137.559 186.310,137.559 C186.310,137.559 186.310,98.841 186.310,98.841 C186.310,94.296 190.000,90.583 194.536,90.583 C199.073,90.583 202.759,94.296 202.759,98.841 C202.759,98.841 202.759,161.398 202.759,161.398 ZM127.737,161.398 C127.737,165.960 124.051,169.660 119.519,169.660 C114.986,169.660 111.300,165.960 111.300,161.398 C111.300,161.398 111.300,98.841 111.300,98.841 C111.300,94.296 114.986,90.583 119.519,90.583 C124.051,90.583 127.737,94.296 127.737,98.841 C127.737,98.841 127.737,161.398 127.737,161.398 ZM95.507,169.660 C95.507,169.660 64.343,169.660 64.343,169.660 C59.816,169.660 56.127,165.960 56.127,161.398 C56.127,161.398 56.127,98.841 56.127,98.841 C56.127,94.296 59.816,90.583 64.343,90.583 C68.881,90.583 72.564,94.296 72.564,98.841 C72.564,98.841 72.564,153.146 72.564,153.146 C72.564,153.146 95.507,153.146 95.507,153.146 C100.047,153.146 103.728,156.851 103.728,161.398 C103.728,165.960 100.047,169.660 95.507,169.660 Z"/>
          </g>
        </svg><span>LINEで送る</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShareButtons",
  props: ['title'],
  data() {
    return {
      url: `https://blog.udcxx.me${this.$route.path}`,
      twitter_url: "https://twitter.com/intent/tweet?url={0}&text={1}",
      hatebu_url: "http://b.hatena.ne.jp/add?mode=confirm&amp;url={0}&amp;title={1}",
      line_url: "https://social-plugins.line.me/lineit/share?url={0}"
    };
  },
  methods: {
    formatByArr(msg) {
      // フォーマット（引数可変（配列）版）
      var args = [];
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
      // URLエンコード
      args = args.map(x => encodeURIComponent(x));
      return msg.replace(/\{(\d+)\}/g, function(m, k) {
        return args[k];
      });
    },
    // それぞれパラメータを埋め込む
    twitterUrl() {
      return this.formatByArr(this.twitter_url, this.url, this.title + ' - 無趣味の戯言');
    },
    hatebuUrl() {
      return this.formatByArr(this.hatebu_url, this.url, this.title);
    },
    lineUrl() {
      return this.formatByArr(this.line_url, this.url);
    }
  }
};
</script>

<style lang="scss">

.article_left {
    .share_buttons {
        width: 100%;
        .article_meta {
            width: 100%; height: 6.1rem;
            margin-top: 1rem;
            padding: 2rem;
            border-radius: 1rem;
            display: inline-flex;
            align-items: center;
            background-color: #D1D5D5;
            box-sizing: border-box;
            @media (max-width: 768px) {
                height: 100%;
            }
            a {
                width: 100%; height: 100%;
                display: flex;
                align-items: center;
                @media (max-width: 768px) {
                    justify-content: center;
                }
            }
            svg {
                width: 2.4rem; height: 2.4rem;
                background-color: #D1D5D5;
                fill: #2C2C2C;
                display: inline-block;
                @media (max-width: 768px) {
                  width: 3rem; height: 3rem;
                }
            }
            span {
                padding-left: 1em;
                font-size: 1.6rem; font-weight: normal;
                color: #2C2C2C;
                @media (max-width: 768px) {
                    display: none;
                }
            }
            @media (max-width: 768px) {
                width: 6.1rem;
                padding: 0;
                margin-top: 0;
            }
        }
        .share-twitter:hover {
            .fill_tw { fill: #55acee; }
        }
        .share-hatebu:hover {
            .fill_b { fill: #00A4DE; }
        }
        .share-line:hover {
            .fill_li_1 { fill: #00c300; }
            .fill_li_2 { fill: #ffffff; }
        }
        @media (max-width: 768px) {
            width: 21rem;
            padding-left: 1rem;
            display: flex;
            justify-content: space-between;
        }
    }
}


</style>
