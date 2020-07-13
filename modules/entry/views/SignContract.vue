<template>
  <div class="entry-sign-contract">
    <custom-sign :title="`请您签字`" ref="sign" @result="result"></custom-sign>
    <al-all-head></al-all-head>
    <al-content
      class="entry-sign-contract-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <div class="sign-contract-box">
        <div class="title">
          光大永明人寿保险有限公司
        </div>
        <div class="title-child">
          银行保险代理合同
        </div>
        <div class="content">
          <p>
            双方根据《中华人民共和国保险法》、《中华人民共和国合同法》、《保险销售从业人员监管办法》等国家有关法律、法规和行政规章的规定，本着平等自愿、协商一致的原则，就银保业务人员接受公司的委托，在公司授权范围内代为办理人身保险业务事宜，达成本合同，以兹双方共同遵守。<b
              >本合同及相关文件的订立均不直接或间接构成甲乙双方之间的雇员和雇主关系。</b
            >
          </p>
          <div class="title_1">第一章 委 托</div>
          <p class="title_3">
            第一条
            甲乙双方基于本合同，形成委托代理关系：甲方委托乙方在授权范围内代理人身保险业务，承担该行为产生的法律责任，乙方从事约定的代理行为，获得甲方支付的佣金。
          </p>
          <p class="title_3">
            第二条
            甲方依照《中华人民共和国保险法》、《保险销售从业人员监管办法》的规定，制定《光大永明人寿保险有限公司银保业务人员管理办法》（以下简称“基本法”），作为甲方对乙方管理的基本办法。乙方自愿遵守基本法，并自愿接受甲方的监督管理。
          </p>
          <div class="title_1">第二章 代理权限</div>
          <p class="title_3">
            第三条
            甲方向乙方核发《保险销售从业人员执业证书》之后，乙方方可开始从事保险代理行为。甲方授权乙方在《保险销售从业人员执业证书》中载明的区域内并在甲方合作银行网点之外的区域代理销售甲方保险产品。
          </p>
          <p class="title_3">
            第四条 乙方根据甲方安排，负责维护相关合作银行网点，具体从事如下行为：
          </p>
          <div class="title_child_1">
            <p>
              1、
              网点日常沟通与关系维护、网点业务推动方案制定、网点保险和营销技能培训、网点业务保全与服务；协助银行网点销售人员销售公司产品向客户/银行；
            </p>
            <p>
              2、 完成网点日常营销技能培训和产品培训，根据银保培训体系规划要求，具备符合相应级别的必修课程辅导能力；
            </p>
            <p>
              3、
              负责定期与所辖网点分管负责人、理财经理等进行有效沟通、协调，与所辖网点各层级银行人员保持良好的合作关系，并积极帮助所辖银行网点销售人员解决所遇到的业务问题；
            </p>
            <p>
              4、
              根据所辖网点需求，提供销售支持和客户售后服务，包括但不限于管理和发送各类宣传材料及有价单证、完成投保单的审查与取送、保单的保全与取送工作等，推动业务顺利开展；
            </p>
            <p>
              5、 负责及时收集并反馈市场信息，辅助公司做好市场调研工作；
            </p>
            <p>
              6、 参加公司或部门要求的各项会议、培训及考试，达到公司或部门银保业务经营工作要求；
            </p>
            <p>
              7、 按照甲方管理规定，向客户/银行提供与该保险合同有关的售后服务；
            </p>
            <p>
              8、 其他经甲方授权的行为。
            </p>
          </div>
          <p class="title_3">
            第五条
            代理合同期间，乙方须遵守国家法律、法规，遵守社会公德、遵循诚实信用原则，严格在甲方授权范围开展业务。乙方发生下述行为的，视为违反本合同，甲方有权依照本合同第二十条的规定追究乙方责任：
          </p>
          <div class="title_child_1">
            <p>
              1、
              向客户/银行提供虚假资料或者误导性说明、宣传，或曲意解释条款、投保规则、保全规则，或擅自修改、变更投保书和保单资料、私自篡改或曲意解释产品说明书内容，擅自提高、降低保险费率；
            </p>
            <p>
              2、
              向客户/银行夸大或承诺除保险合同约定之外的投资收益及分红红利，或夸大资金投资渠道、保险保障利益，向客户/银行隐瞒投资风险事实、投资帐户保费分配方式、甲方向客户/银行收取的投资帐户的各项费用及收取比例，以不正当手段影响客户投保选择；
            </p>
            <p>
              3、 未向客户/银行明确解释说明保险条款，对保险责任及免赔责任等重要条款未尽明确说明和提示义务。
            </p>
            <p>
              4、
              唆使、引导或阻碍客户/银行不履行告知或如实告知义务，协同客户/银行隐瞒真相，明知客户告知不实或伪造、变造有关保险文件，却未告知公司或未及时告知公司，协同客户/银行提供不完整病史、财务资料，或隐瞒客户病史、财务资料；
            </p>
            <p>
              5、
              投保书、保险单等相关保险合同单证、契约审核函件、体检报告书、授权委托书、保单回执及各类变更申请书等甲方规定需客户（投保人、被保险人、受益人或监护人）本人亲自填写或亲笔签名的相关保险资料，非客户本人亲笔填写或签名、代客户或唆使他人代客户填写或签名，或者对于健康告知等应当询问客户的内容及事项，未进行询问的；
            </p>
            <p>
              6、
              协同客户/银行让他人顶替体检、伪造或修改体检报告，或明知客户顶替体检不阻止且不告知甲方，或在客户不知情的情况下擅自找他人顶替体检；
            </p>
            <p>
              7、
              擅自以甲方名义签发保险合同，擅自修改、变更、删除、扩大条款或与客户/银行签订的附加合约，或者给予或承诺保险合同规定以外的其他利益；
            </p>
            <p>
              8、
              擅自代表甲方接受保险风险或强迫公司接受某些保险形式或条款，或未经甲方书面通知擅自宣布保险合同生效，或擅自就保险合同批单或附贴批注向投保人/银行做出任何担保、保证或陈述；
            </p>
            <p>
              9、 诱导、唆使投保人终止、放弃有效的保险合同，购买新的保险产品，损害投保人利益；
            </p>
            <p>
              10、 利用行政权力、职务、职业便利等不正当手段或以恫吓方式进行业务活动；
            </p>
            <p>
              11、
              在明知投保人使用或采取非法或违规所得和收益的情况下不告知甲方，仍促使甲方与其订立保险合同，或与投保人、被保险人、受益人恶意串通，损害甲方利益；
            </p>
            <p>
              12、
              提供或诱导客户/银行提供虚假信息，如假证件，假电话，假年龄，虚假投、被保人关系，虚假病历资料、虚假健康资料、虚假财务资料等，或伪造、篡改客户信息，违反限定范围接触、使用客户信息，以及泄露和倒卖客户信息；
            </p>
            <p>13、 提供虚假个人资料，如假学历、假身份证明、隐瞒和伪造个人简历等；</p>
            <p>
              14、
              未获得甲方书面同意前，通过任何网络、刊物、媒体以及在任何场合下发布任何有关甲方以及相关企业的广告、宣传或招聘信息、申明等；
            </p>
            <p>
              15、
              未经甲方授权，私自印刷（包括电子文档）带有公司标识的文件或材料（包括但不限于宣传资料、名片、信封、信笺）发给客户/银行，或修改、增加、删除或涂抹标有公司名称、标志的任何文件和材料以及公司客户的任何资料；
            </p>
            <p>
              16、
              未经甲方授权，向他人提出或商议有关索赔、给付等相关事宜，或利用职务之便故意编造未曾发生的保险事故进行虚假理赔、骗取保险金，或诱导保单持有人或他人向甲方提出无效、不当的保险索赔；
            </p>
            <p>17、 将客户的通讯地址、联系方式等客户资料填写为非客户本人的通讯地址、联系方式等。</p>
            <p>18、 未经甲方同意，乙方代表他人垫付保险费；</p>
            <p>19、 将自已招揽的业务不全部提交给甲方，为任何其他保险公司或代理公司、经纪公司承揽保险业务；</p>
            <p>20、 滞留、挪用或侵占客户保险费、甲方支付给客户的各类保险金、解约金、退费等款项；</p>
            <p>
              21、 在销售过程中，未向客户/银行展示及提供产品说明书，使用未经甲方核准的建议书、产品说明书及其他展业资料；
            </p>
            <p>22、 私下转让保单，致使客户无人服务、导致甲方、客户/银行损失；</p>
            <p>
              23、
              恶意破坏公司职场内电脑、投影仪等办公设备以及其他固定资产等各项设施，偷窃、套取或者故意损坏他人财务或者公物；
            </p>
            <p>
              24、
              未经过甲方合法授权，使用或利用甲方资产、资源及权益，或非法侵占、使用、窃取、泄露、擅自转让、唆使代理人解约及其他方式侵害甲方资产、资源及权益；
            </p>
            <p>
              25、
              未经公司书面授权，未向所属机构所在地保监局报备，向客户/银行销售或推介非保险金融产品，或不在公司营业场所销售或推介非保险金融产品。
            </p>
            <p>
              26、
              违背客户意愿，以欺骗、误导、违规搭售等方式销售，向超出其需求和风险承受能力的客户销售，或者与合作银行网点、保险专业中介机构恶意串通从事有损客户、公司利益的行为。
            </p>
            <p>
              27、
              基本法及《银保业务人员品质管理办法》列明的乙方在代理活动中不能从事的其他行为，以及违反国家法律、法规和监管机构其他规定情形。
            </p>
          </div>
          <p class="title_3">第六条 甲方应按照基本法、甲方有关实施办法及监管有关规定及时向乙方支付佣金：</p>
          <div class="title_child_1">
            <p>1、 甲方应按照基本法规定向乙方支付的各项佣金；</p>
            <p>2、 乙方在同时符合创新银保基本法的发佣条件后有权领取佣金：</p>
            <p>3、 本合同终止后，乙方无权主张其在合同终止后所产生的佣金，包括续期佣金等。</p>
          </div>
          <p class="title_3">
            第七条
            乙方达到基本法要求，晋升成为管理序列业务人员，除承担本合同约定的代理人各项责任和义务外，还应履行基本法规定的管理序列的管理职责。
          </p>
          <div class="title_1">第三章 权利和义务</div>
          <p class="title_3">第八条 本合同有效期内，甲方享有以下权利：</p>
          <div class="title_child_1">
            <p>1、 有权依照国家有关法律、法规和公司规章制度对乙方在代理期间的行为进行监督、管理、检查；</p>
            <p>2、 有权依照基本法对乙方的业务情况、业务活动进行考核和要求；</p>
            <p>
              3、 有权依照国家有关法律法规要求乙方参加以激励展业意愿及提升业务技能为目的的各项培训、会议及早、夕会；
            </p>
            <p>
              4、
              有权依照监管机构的要求或依市场变化、业务发展的需求，修订基本法及甲方制定的其他有关保险营销员管理的规章制度，乙方应遵照执行；
            </p>
            <p>
              5、
              对乙方因违反国家法律、法规或本合同约定而造成甲方损失的，甲方有权在乙方的佣金中扣除，对不足弥补甲方损失的部分，甲方有权继续向乙方进行追偿；
            </p>
            <p>6、 有权在本合同终止后，收回乙方持有的属于公司的单证、票据、欠款、业务资料、展业用具和办公用品等。</p>
          </div>
          <p class="title_3">第九条 本合同有效期内，甲方承担以下义务：</p>
          <div class="title_child_1">
            <p>1、 按照本合同第五条的约定向乙方支付佣金；</p>
            <p>2、 在中国银行保险监督管理委员会保险中介监管信息系统为乙方进行执业登记；</p>
            <p>3、 向乙方提供开展代理业务必要的培训支持。</p>
          </div>
          <p class="title_3">第十条 本合同有效期内，乙方享有以下权利：</p>
          <div class="title_child_1">
            <p>1、 在甲方授权范围内从事保险代理活动；</p>
            <p>2、 依据本合同及基本法约定获取佣金；</p>
            <p>3、 参加甲方组织的各类业务竞赛并依据结果获得奖励。</p>
          </div>
          <p class="title_4">第十一条 本合同有效期内，乙方承担以下义务：</p>
          <div class="title_child_1">
            <p>1、 应本着诚实信用的原则，按照本合同以及有关规定，在甲方授权范围内进行代理活动；</p>
            <p>
              2、
              遵守基本法及甲方制定的其他有关保险营销员管理的规章制度，包括但不限于品质管理、活动管理、业务流程、业务培训、财务管理等，接受甲方监督；
            </p>
            <p>
              3、
              按照本合同的约定和基本法的规定，按照参加甲方组织的以激励展业意愿及提升业务技能为目的的各项培训、会议或早、夕会等；
            </p>
            <p>
              4、
              妥善保管和按规定使用从公司领取的各种单证、票据等文件资料，对重要单证按规定及时核销，有义务按照公司的规定向客户/银行送达保险合同等文件、资料；
            </p>
            <p>
              5、
              对甲方的商业秘密负有保密的义务，甲方的商业秘密包括但不限于技术信息、经营信息、客户信息等，同时对甲方所有客户的个人隐私及财产、业务、家庭情况等有关资料秘密的义务，且保密义务在本合同终止后仍然有效；
            </p>
            <p>
              6、
              若使用甲方提供的任何软件，应遵守其与公司签署的软件使用协议，本合同终止后，应按要求归还全部无偿提供的软件或任何支持操作手册；
            </p>
            <p>
              7、
              对甲方的资产、资源及权益负有维护和保护义务，不得以任何方式诋毁甲方的声誉和形象，甲方资产、资源及权益包括但不限于下列各项内容：
            </p>
            <div class="title_child_2">
              <p>
                （1） 享有所有权或其他合法权利的动产及不动产等有形资产；
              </p>
              <p>
                （2） 业务经营中积累的全部客户资料；
              </p>
              <p>
                （3） 代理人队伍；
              </p>
              <p>
                （4） 通过各种方式建立的业务渠道；
              </p>
              <p>
                （5） 通过各种信息获取的展业机会；
              </p>
              <p>
                （6） 电脑及网络系统存储、处理的全部信息资料；
              </p>
              <p>
                （7） 关于代理人管理、团队建设、佣金支付、展业技能等各项制度或经营措施；
              </p>
              <p>
                （8） 商业秘密；
              </p>
              <p>
                （9） 享有著作权的各种培训资料、行销辅助品等；
              </p>
              <p>
                （10） 商标权、名称权、CI及其他标识；
              </p>
              <p>
                （11） 其他形式的甲方有形资产、无形资产、资源或权益。
              </p>
            </div>
            <p>
              8、 依法纳税，并同意甲方代扣代缴相应款项；
            </p>
            <p>
              9、
              遵守光大永明人寿保险有限公司《反洗钱管理办法》、《反恐管理办法》等与反洗钱、反恐工作有关的各项规章制度，在与客户建立业务关系时，遵循“了解你的客户”的原则，要求客户/银行出示真实有效的身份证件或者其他身份证明文件，进行核对登记，并了解客户的交易目的和交易性质，有效识别交易的受益人，不得为身份不明的客户提供服务或者办理保险业务。
            </p>
          </div>
          <p class="title_4">
            第十二条
            乙方自行聘用他人协助管理或开展业务的，或者自行将客户管理等相关工作委托或外包给他人时，应明示不属于甲方的招聘行为，乙方自聘人员在其协助管理过程中，给甲方造成损失的，乙方应承担赔偿责任，给任何第三方造成损失的，均由乙方负责赔偿，甲方不承担任何法律责任。
          </p>
          <p class="title_4">
            第十三条
            乙方承诺提供的个人基本信息、身份证件、学历证明、收入证明等真实可靠，并对上述材料的真实性承担法律责任。乙方同时承诺无犯罪及其他不良记录。乙方授权甲方为核实上述承诺的真实性可进行必要的查询、收集、提供本人的信息。
          </p>
          <div class="title_1">第四章 合同的终止和解除</div>
          <p class="title_4">第十四条 法定终止</p>
          <div class="title_child_1">
            <p>1、 本合同履行期限届满没有顺延的；</p>
            <p>2、 乙方身故或被依法宣告失踪；</p>
            <p>3、 因不可抗力致使无法继续履行本合同。</p>
          </div>
          <p class="title_4">
            第十五条 协商终止 双方协商一致并签订书面协议，可提前终止本合同。协议签订之日为合同终止日。
          </p>
          <p class="title_4">第十六条 单方面解除</p>
          <div class="title_child_1">
            <p>1、 有下列情形之一发生时，甲方有权单方面解除本合同。</p>
            <div class="title_child_2">
              <p>（1） 乙方违反国家法律法规，给甲方财产或名誉造成损失的；</p>
              <p>（2） 乙方违反国家法律法规或《保险销售从业人员监管办法》及国家行政管理部门颁布的规章制度的；</p>
              <p>（3） 乙方隐瞒曾受到刑事处罚或曾因违反有关金融、行政法规和规章而受过处罚等事实与甲方签订合同的；</p>
              <p>（4） 乙方死亡或被宣告死亡，完全或部分丧失行为能力或因健康原因而无法履行乙方职责；</p>
              <p>（5） 乙方发生本合同第四条的各种行为；如乙方为主管的，违反本合同第六条的规定；</p>
              <p>（6） 乙方在业务考核中未达到基本法规定的继续代理甲方业务所需的最低业务标准的；</p>
              <p>（7） 乙方未履行本合同约定义务给乙方造成损失的。</p>
            </div>
            <p>2、 有下列情形之一发生时，乙方有权单方面解除本合同。</p>
            <div class="title_child_2">
              <p>（1） 甲方违反法律法规而严重侵害乙方的合法权益的；</p>
              <p>（2） 甲方未按照本合同约定向乙方支付佣金的。</p>
            </div>
          </div>
          <p class="title_4">
            第十七条
            甲乙双方一致同意，任何一方单方面解除本合同的，自解除合同的书面通知书送达到对方即视为送达对方，本合同自送达之日终止。被送达方为甲方的，送达至甲方营业场所；被送达方为乙方的，送达至本合同载明的乙方住址或乙方提供的电子邮箱。
          </p>
          <p class="title_4">
            第十八条
            因国家法律法规、国家行政管理机关相关规定，甲方停止在本合同约定的业务区域营业的，甲乙双方同意本合同随即自行终止，无需另行通知。
          </p>
          <p class="title_4">第十九条 自本合同终止之日起</p>
          <div class="title_child_1">
            <p>1、 甲乙双方的委托代理关系终止，乙方不得再以甲方代理人的名义从事保险代理活动；</p>
            <p>2、 乙方无权再依据本合同和基本法获得佣金；</p>
            <p>3、 甲方有权以函件、媒介或其他必要的方式告知客户及其它有关机构或人士；</p>
            <p>
              4、
              本合同终止之日起5个工作日内，乙方应按照基本法和甲方有关营销员管理的规定及制度，办理交接手续，并归还甲方如下文件、物品：
            </p>
            <div class="title_child_1">
              <p>（1） 空白的、任何已签署或作废的投保单；</p>
              <p>（2） 甲方已签发但乙方尚未送达客户的人身保险单；</p>
              <p>（3） 《保险销售从业人员执业证书》；</p>
              <p>（4） 应归还甲方的其他款项、单证、资料及财物。</p>
            </div>
            <p>
              5、
              乙方身故或被依法宣告失踪或宣告死亡的，由乙方配偶或直系亲属办理交接手续。乙方无配偶、无直系亲属或配偶、直系亲属无完全民事行为能力的，由乙方提供的紧急联系人办理交接手续。
            </p>
          </div>
          <p class="title_4">第二十条 违约责任及追偿</p>
          <div class="title_child_1">
            <p>1. 甲乙双方均应严格履行本合同约定的义务，任意一方违反本合同义务的，另一方均有权追究违约方的违约责任；</p>
            <p>
              2.
              乙方没有代理权、超越代理权或者代理权终止后以甲方名义从事代理活动，给甲方或客户造成财产损失的，由乙方承担一切责任；如该经济责任确应由甲方先行承担的，甲方有权在乙方的佣金中扣除，对不足弥补损失的部分，甲方有权继续向乙方进行追偿；
            </p>
            <p>
              3.
              本合同一经终止，乙方不得从事以下行为，造成甲方损失的，甲方有权在乙方的佣金中扣除，对不足弥补损失的部分，甲方有权继续向乙方进行追偿；
            </p>
            <div class="title_child_2">
              <p>（1） 乙方泄漏任何甲方商业秘密及客户的个人隐私及财产、业务、家庭情况等有关资料；</p>
              <p>（2） 乙方从事招揽诱致任何甲方客户将契约或批注项下的保单取消、修订或减少的行为；</p>
              <p>（3） 乙方以任何方式诱导、唆使甲方的其它银保业务人员申请解除与甲方的《保险代理合同》。</p>
              <p>（4） 其他给甲方业务、管理及资产、资源和权益造成损害的行为。</p>
            </div>
            <p>
              4.
              乙方作为主管违反了本合同第四条规定的各种行为，乙方自愿承担因违约或过错给甲方造成的一切损失，具体违约金额依照《银保业务人员品质管理办法》规定；损失为乙方由此给甲方或者第三方造成的一切损失，甲方还可以对乙方进行降级处理。
            </p>
            <p>5. 甲乙双方基于本合同享有的对对方的追偿权及违约金请求权，不因本合同终止而丧失。</p>
          </div>
          <div class="title_1">第五章 附则</div>
          <p class="title_5">
            第二十一条
            本合同适用《中华人民共和国合同法》、《中华人民共和国保险法》等相关法律法规和基本法等规章制度。在本合同有效期内如果本合同所适用的法律法规或规章制度有变更，按变更后的法律法规或规章制度执行。
          </p>
          <p class="title_5">
            第二十二条 本合同未尽事宜，经甲乙双方友好协商后，做出书面的补充协议，补充协议与本合同具有同等效力。
          </p>
          <p class="title_5">
            第二十三条
            执行本合同发生争议的，由甲乙双方协商解决，协商不成的，任何一方均有权向合同签订地有管辖权的人民法院提起诉讼。
          </p>
          <p class="title_5">
            第二十四条 本合同一旦缔结，取代所有先前书面或口头的理解和说明。
          </p>
          <p class="title_5">
            第二十五条
            本合同有效期为三年，自合同签订之日起计算。甲乙双方任何一方均可在合同期满前十五日内提出书面的解约要求，未提出书面解约要求的，本合同有效期自动顺延三年，并可多次顺延。
          </p>
          <p class="title_5">第二十六条 本合同一式两份，合同双方各持一份，具有同等法律效力。</p>
          <p><b>乙方声明已经仔细阅读并理解了本合同的所有条款，同时确认本合同不属于劳动合同。</b></p>
        </div>
        <div class="company-name">甲方：{{ branchComName }}</div>
        <div class="sign">
          <div class="title">
            乙方签字：
          </div>
          <div class="sign-box-content" @click="openSign">
            <img class="sign_img" v-if="signData != ''" :src="`${url_preview_prefix}/${signData}`" alt="" />
            <div v-else class="sign-box">
              <div class="sign-img-box">
                <img class="icon_img" src="../assets/images/icon2_join_sign.png" />
              </div>
              <div class="sign-button">点击签字</div>
            </div>
          </div>
        </div>
        <div class="read-check">
          <n22-agree
            v-model="agreeConf.checked"
            :disabled="agreeConf.disabled"
            :size="agreeConf.size"
            @change="onChange(agreeConf.name, agreeConf.checked, $event)"
          >
            我已认真阅读并知悉
            <a :style="{ color: entry.entryStatementState ? '#ffba03' : 'gray' }" @click="go('entry/entryExplainBook')"
              >《入职声明书》</a
            >
            <a
              :style="{ color: entry.occupationStatementState ? '#ffba03' : 'gray' }"
              @click="go('entry/occupationPromiseBook')"
              >《职业行为声明和承诺书》</a
            >
          </n22-agree>
        </div>
        <div class="button">
          <n22-button @click="next" type="primary">提交</n22-button>
        </div>
      </div>
    </al-content>
  </div>
</template>

<script>
import { mapState } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, Button, Agree, Dialog, Toast } from "al-mobile";
import CustomSign from "@/components/common/CustomSign";

//导入当前页面所使用的到的接口
import { sendData, cosTmpKey, saveSign, querySign, getLiveAuth } from "../service/getData";

import wx from "weixin-js-sdk";
import native from "js-native-n22";
const __cos = require("@t/cos");

export default {
  name: "join-company-sign-contract", //使用xx-xx-xx命名方式具体看操作文档
  props: {},
  components: {
    [AllHead.name]: AllHead,
    [Content.name]: Content,
    [Button.name]: Button,
    [Agree.name]: Agree,
    [CustomSign.name]: CustomSign,
    [Dialog.name]: Dialog,
  },
  computed: {
    ...mapState(["entry"]),
  },
  mounted() {
    console.log("%c sign-contract>生命周期>mounted", "color:green;", "");
    this.requestCosTmpKey(body => {
      this.authConfig = {
        region: body.data.allowPrefix.substr(0, body.data.allowPrefix.length - 1), // 授权访问的入口目录
        secretId: body.data.secretId,
        secretKey: body.data.secretKey,
        xCosSecurityToken: body.data.token,
        expiredTime: body.data.expiredTime,
      };
    });
    this.initPageData("mounted");
    console.log(this.entry.entryStatementState);
    console.log(this.entry.occupationStatementState);
  },
  activated() {
    this.initPageData("activated");
    console.log(this.entry.entryStatementState);
    console.log(this.entry.occupationStatementState);
  },
  watch: {},
  data() {
    return {
      branchComName: "光大永明人寿保险有限公司",
      url_preview_prefix:
        "//" + process.env.VUE_APP_COS_BUCKET + ".cos." + process.env.VUE_APP_COS_REGION + ".myqcloud.com",
      authConfig: {
        region: "", // 授权访问的入口目录
        secretId: "",
        secretKey: "",
        xCosSecurityToken: "",
        expiredTime: "",
      },
      signData: "",
      isShowSign: false,
      caValue: {
        isCASOpen: false,
        isBJCASOpen: false,
        image: "",
        context_id: "",
        applyCode: this.$route.params.applyCode,
        orderId: this.$route.params.planId,
      },
      itemObject: {
        fieldname: "投保人签名",
        fieldValue: "",
        commitment: "本人已知晓保险从业人员不得违规销售非保险金融产品，由此造成的风险自行承担。",
        childFileIdList: [],
      },
      agreeConf: {
        checked: false,
        name: "agree0",
        size: "md",
        disabled: false,
        introduction: "选中状态",
      },
      tabs: [
        //content组件对象
        {
          label: "默认单个列表不展示",
          name: 0,
          listType: "1",
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "",
        },
      ],
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    onChange(name, checked) {
      console.log(`agree name = ${name} is ${checked ? "checked" : "unchecked"}`);
    },
    //初始化页面数据
    initPageData(type) {
      this.requestQuerySign(
        this.$route.query["uid"],
        body => {
          this.branchComName = body.data.branchComName != "" ? body.data.branchComName : "光大永明人寿保险有限公司";
          if (body.data != undefined && body.data.cosUrl != undefined && body.data.cosUrl != "") {
            this.signData = body.data.cosUrl;
          }
          if (type === "mounted") {
            let isSuccess = this.$route.query["success"];
            if (isSuccess != undefined) {
              //未做过识别,url上的内容都是字符串没有类型
              if (isSuccess == "false") {
                let message = this.$route.query["message"];
                Toast.info(message);
              } else if (isSuccess == "true") {
                //调用子组件中打开签字页面的函数
                this.$refs.sign.show();
              }
            }
          }
        },
        error => {
          console.log(error);
        },
      );
    },
    next() {
      if (this.signData == undefined || this.signData == "") {
        this.alert("请先进行签字");
        return;
      }
      if (!this.entry.entryStatementState) {
        this.alert("请阅读入职声明书");
        return;
      }
      if (!this.entry.occupationStatementState) {
        this.alert("请阅读职业行为声明和承诺书");
        return;
      }
      if (!this.agreeConf.checked) {
        this.alert("请进行勾选已阅读并知悉相关信息");
        return;
      }
      console.log("通过");
      this.requestSendData(body => {
        console.log(body);
        this.determined("数据已成功提交,请等待审核");
      });
    },
    //获取人脸识别Url
    requestGetLiveAuth(uid, return_url, successCallback, errorCallback) {
      //构建axios基础
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      let request = {
        id: uid,
        return_url: return_url,
      };
      getLiveAuth({ data: request, config: axiosParams, method: "get" }).then(
        data => {
          successCallback && successCallback(data);
        },
        error => {
          errorCallback && errorCallback(error);
        },
      );
    },
    //发送提交数据接口
    requestSendData(successCallback, errorCallback) {
      //构建axios基础
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      //构建请求参数
      let request = {
        id: this.$route.query["uid"],
      };
      //发起请求
      sendData({ data: request, config: axiosParams }).then(
        data => {
          successCallback && successCallback(data);
        },
        error => {
          errorCallback && errorCallback(error);
        },
      );
    },
    //提示选择窗口
    alert(message) {
      Dialog.alert({
        title: "温馨提示",
        content: message,
        cancelText: "取消",
        confirmText: "确定",
        onConfirm: () => console.log("[Dialog.alert] confirm clicked"),
      });
    },
    determined(message) {
      Dialog.alert({
        title: "温馨提示",
        content: message,
        cancelText: "取消",
        confirmText: "确定",
        onConfirm: () => {
          wx.closeWindow();
        },
      });
    },
    //打开签字页面
    openSign() {
      let requestUrl =
        new URL(window.globalConfig.rootUrl).origin +
        "/app/entry/index.html#/entry/signContract?isShare=2&uid=" +
        this.$route.query["uid"];
      console.log(requestUrl);
      this.requestGetLiveAuth(
        this.$route.query["uid"],
        encodeURIComponent(requestUrl),
        body => {
          console.log(body.data.id);
          console.log(body.data.url);
          if (body.data.url != "") {
            window.location.replace(body.data.url);
          }
        },
        error => {
          console.log(error);
        },
      );
    },
    //签字完成后返回
    async result(data) {
      let jpegData = data.replace("data:image/png;", "data:image/jpeg;");
      let result = await this.uploadFileToCos(this.dataURLtoBlob(jpegData, "sign.jpg"));
      console.log(result);
      if (result.data) {
        this.requestSaveSign(result.data.Key, body => {
          console.log(body);
          this.signData = result.data.Key;
        });
      }
    },
    //查询COS临时秘钥接口
    requestCosTmpKey(successCallback, errorCallback) {
      //构建axios基础
      const axiosParams = {
        loaddingText: "数据请求中...",
      };
      //构建请求参数
      let request = {};
      cosTmpKey({ data: request, config: axiosParams, method: "get" }).then(
        data => {
          successCallback && successCallback(data);
        },
        error => {
          errorCallback && errorCallback(error);
        },
      );
    },
    //保存签字影像接口
    requestSaveSign(key, successCallback, errorCallback) {
      //构建axios基础
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      //构建请求参数
      let request = {
        userId: this.$route.query["uid"],
        fileType: "SIGN",
        cosUrl: key,
        fileName: this.getFileNameFromUrl(key),
      };
      //发起请求
      saveSign({ data: request, config: axiosParams }).then(
        data => {
          successCallback && successCallback(data);
        },
        error => {
          errorCallback && errorCallback(error);
        },
      );
    },
    //获取签字影像接口
    requestQuerySign(uid, successCallback, errorCallback) {
      //构建axios基础
      const axiosParams = {
        isLoadding: true,
        loaddingText: "努力请求中...",
      };
      querySign({ userid: uid, config: axiosParams, method: "get" }).then(
        data => {
          successCallback && successCallback(data);
        },
        error => {
          errorCallback && errorCallback(error);
        },
      );
    },
    //将服务器返回的File对象转为imageList
    getFileNameFromUrl(url) {
      if (url == undefined) {
        return "";
      }
      let urlArr = url.split("/");
      return decodeURIComponent(urlArr[urlArr.length - 1]);
    },
    /**
     * 上传影像到COS
     */
    uploadFileToCos(file) {
      return new Promise(resolve => {
        __cos.cosUtils.sliceUploadFile(
          // Config
          {
            bucket: process.env.VUE_APP_COS_BUCKET,
            region: process.env.VUE_APP_COS_REGION,
          },
          // Auth
          {
            type: "temp", // 认证类型
            region: this.authConfig.region, // 授权访问的入口目录
            secretId: this.authConfig.secretId,
            secretKey: this.authConfig.secretKey,
            xCosSecurityToken: this.authConfig.xCosSecurityToken,
            expiredTime: this.authConfig.expiredTime,
          },
          // Path
          {
            modelName: "entry",
            pageName: "sign_page",
          },
          file,
          progress => {
            Toast.loading(" 努力上传中: " + progress.percent * 100);
            console.log(JSON.stringify(progress));
          },
          (data, err) => {
            Toast.hide();
            if (err != null) {
              resolve({ err: err });
            } else {
              resolve({ data: data });
            }
          },
        );
      });
    },
    dataURLtoBlob(dataurl, fileName) {
      let arr = dataurl.split(",");
      let mime = arr[0].match(/:(.*?);/) != null ? arr[0].match(/:(.*?);/)[1] : "text/plain";
      let bstr = arr[0].match(/:(.*?);/) != null ? atob(arr[1]) : atob(arr[0]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      let file = new Blob([u8arr], {
        type: mime,
      });
      file.name = fileName;
      return file;
    },
    //通过插件获取代理人信息中的工号
    getComNameFromStorageNative() {
      return new Promise(resolve => {
        native.storage(
          {
            mode: 2,
            key: "userInfo",
          },
          content => {
            console.log(content);
            resolve(content.object.appLoginUser.comName);
          },
        );
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.entry-sign-contract {
  .entry-sign-contract-content {
    .sign-contract-box {
      background: #fff;
      margin-top: 11px;
      display: flex;
      flex-direction: column;
      padding: 16px;
      .title {
        margin: auto;
        height: 25px;
        font-size: 18px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 25px;
      }
      .title-child {
        margin: auto;
        height: 25px;
        font-size: 18px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 25px;
      }
      .content {
        margin-top: 20px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 17px;
        .title_1 {
          margin: auto;
          height: 25px;
          font-size: 14px;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 25px;
          text-align: center;
        }
        .title_3 {
          text-indent: -42px;
          margin-left: 42px;
        }
        .title_4 {
          text-indent: -54px;
          margin-left: 58px;
        }
        .title_5 {
          text-indent: -66px;
          margin-left: 70px;
        }
        .title_child_1 {
          p {
            text-indent: -15px;
            margin-left: 40px;
          }
        }
        .title_child_2 {
          p {
            margin-left: 55px;
          }
        }
        p {
          text-indent: 2em;
        }
      }
      .company-name {
        margin-top: 16px;
        height: 20px;
        font-size: 14px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;
      }
      .sign {
        margin-top: 15px;
        .title {
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
        }
        .icon_img {
          width: 52px;
          height: 60px;
        }
        .sign-box-content {
          margin-top: 20px;
          display: flex;
          justify-content: center;
          .sign_img {
            width: 156px;
            height: 60px;
          }
          .sign-box {
            width: 100px;
            border-radius: 8px;
            border: 1px dashed #c3c1c1;
            text-align: center;
            padding-top: 13px;
            padding-bottom: 18px;
            .sign-img-box {
              margin-left: 22px;
              margin-right: 22px;
              margin-top: 6px;
              margin-bottom: 6px;
            }
            .sign-button {
              height: 18px;
              font-size: 13px;
              font-weight: 400;
              color: rgba(190, 190, 190, 1);
              line-height: 18px;
            }
          }
        }
      }
      .read-check {
        margin-top: 55px;
        display: flex;
        height: 17px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 17px;
      }
      .button {
        margin-left: 90px;
        margin-right: 90px;
        margin-bottom: 45px;
        margin-top: 45px;
      }
    }
  }
}
</style>
