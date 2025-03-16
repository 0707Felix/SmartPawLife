const About = () => {
  return (
    <>
      <div className="about d-flex align-items-center justify-content-center">
        <div className="text-white p-2">
          <h1>關於 SmartPaw Life</h1>
          <p>智能寵物，提供毛孩最優質的照顧，為你打造更多美好時光</p>
        </div>
      </div>

      <div className="container">
        <div className="row my-5">
          <div className="col-sm-10 mx-auto">
            <h2 className="text-center fw-bold mb-60">品牌年表</h2>

            {[
              {
                year: "2004年",
                title: "品牌創立",
                description:
                  "SmartPaw Life成立，專注於為寵物提供智能化解決方案，旨在提升寵物生活品質並讓主與寵物保持更緊密的聯繫",
                img:"",
              },
              {
                year: "2008年",
                title: "首款產品",
                description:
                  "推出首款智能寵物互動攝像頭，讓飼主能隨時隨地觀看和與寵物互動，首次實現智能寵物監控功能",
              },
              {
                year: "2010年",
                title: "產品擴展",
                description:
                  "推出首款智能自動餵食器，幫助飼主遠程控制寵物的飲食時間與分量，解決了忙碌飼主的困擾",
              },
              {
                year: "2018年",
                title: "健康監測系列",
                description:
                  "發布智能寵物健康監測項圈，利用心跳、體溫、活動量等數據幫助飼主實時了解寵物健康狀況",
              },
              {
                year: "2024年",
                title: "國際化發展",
                description:
                  "開始在國際市場推廣產品，並進行多個地區的市場調研，積極擴展品牌的國際影響力",
              },
              {
                year: "2025年",
                title: "持續創新",
                description:
                  "SmartPaw Life 將持續致力於智能化技術的創新，推出更多高效、便捷、智能的產品，讓飼主能夠更好地照顧他們的寵物，創造更幸福的生活",
              },
     
            ].map((item, index) => (
              <div className="d-flex justify-centent-between gap-3 mb-5" key={index}>
                <p className="my-auto col-2">{item.year}</p>
                    <img src={`./img/about/Button${index+1}.svg`} alt={item.year} />
                <div>
                  <p className="mb-2">
                    <strong className="text-primary">{item.title}</strong>
                  </p>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-primary-lg">
        <div className="container">
          <div className="row my-5">
            <div className="col-sm-10 mx-auto">
              <h1 className="display-4 font-weight-bold mb-4 text-center mb-60">
                品牌故事
              </h1>
              <p className="lead mb-5 fs-5">
                在現今快節奏的生活中，飼主們面臨著許多挑戰，無論是工作、家庭還是社交生活，常常讓我們無法全程陪伴在寵物身旁。然而，寵物作為我們家庭的一部分，它們需要的不僅是食物與水，還有愛、關注與陪伴。SmartPaw
                Life的誕生正是源於這樣的需求——讓寵物生活更加智能、更加健康，讓每位飼主都能輕鬆照顧寵物，並與他們建立更加親密的連結。
              </p>
              <p className="mb-5 fs-5">
                <strong className="text-primary">
                  創始理念：從閱愛出發，讓科技成為寵物的守護者
                </strong>
                <br />
                SmartPaw Life的創始人，Anna
                Wong，一位熱愛動物的科技愛好者，在照顧自己寵物的過程中，發現市面上缺乏能夠真正滿足現代飼主需求的智能產品。她深知，現代生活繁忙，許多飼主無法全天候陪伴寵物，因此，她決心將科技與愛心結合，打造一系列智能化產品，讓每位飼主都能隨時隨地照顧寵物，為他們提供更好的生活。
              </p>
              <p className="mb-5 fs-5">
                <strong className="text-primary">
                  智能化的願景：提升寵物的生活品質
                </strong>
                <br />
                SmartPaw
                Life不僅是一個品牌，更是一個關於寵物健康和幸福的使命。從我們的首款智能寵物攝像頭，到自動觀食器、健康監測項圈，每一款產品都凝聚著對寵物的關愛。每一個產品背後，都是一個團隊對於品質、創新與實用性的承諾，致力於讓科技與寵物的生活更貼近、更加舒適。
              </p>
              <p className="mb-5 fs-5">
                <strong className="text-primary">永續創新：從當下到未來</strong>
                <br />
                進入2024年，SmartPaw
                Life依然秉持著不斷創新的精神，持續推出更多有助於改善寵物生活品質的智能產品。我們的目標是讓每一位飼主都能夠擁有更輕鬆的照顧方式，並能與自己的寵物保持更深的聯繫。我們的產品不僅僅是工具，更是飼主與寵物之間的橋樑，讓愛在每一個瞬間流動。
              </p>
              <p className="mb-5 fs-5">
                <strong className="text-primary">
                  品牌使命：智能科技，溫暖陪伴
                </strong>
                <br />
                SmartPaw
                Life的使命，不僅是提供智能科技，更是提供一份來自心底的溫暖與關懷。未來，我們將繼續推動產品創新，提升智能技術，並加強社會責任，與更多動物保護機構合作，讓每一隻寵物都能夠享受到健康、幸福的生活。我們希望，无论您身处何地，都能通过我们的产品，继续爱护和陪伴您的毛孩子，让它们在智能科技的守护下，过上更加美好的生活。
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row my-5">
        <div className="col-sm-10 mx-auto">
              <h1 className="display-4 font-weight-bold mb-60 text-center">
                社會責任
              </h1>
              <div className="d-sm-flex align-items-center justify-content-between">
                <img
                  className="col-sm-3"
                  style={{ width: "auto" }}
                  src="./img/about/storyimg.png"
                  alt="社會責任"
                />

                <div className="col-sm-6">
                  <p className="lead">
                    <strong>攜手關懷，共同守護寵物的未來</strong>
                    <br />在 SmartPaw
                    Life，我們深知，除了關注自家寵物的健康和幸福外，還應該承擔更多的社會責任。作為一個致力於寵物生活品質提升的品牌，我們不僅關心消費者的需求，更重視那些無家可歸、需要幫助的動物。我們積極與多個動物救援機構、動物保護組織合作，提供資源支持和必要的技術支持，幫助流浪動物找到新的家園，並提供健康管理服務。我們的目標是讓每一隻寵物都能夠過上健康、幸福的生活，無論牠們曾經經歷過什麼。
                  </p>
                  <p className="lead">
                    此外，SmartPaw
                    Life也致力於推動可持續發展，所有的產品設計和製造過程都遵循環保原則，最大程度減少對環境的影響。我們相信，只有創造出對動物和環境都有益的產品，才能讓我們的社會變得更加美好。
                  </p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default About;
