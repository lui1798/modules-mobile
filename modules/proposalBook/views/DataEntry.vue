<template>
  <div class="proposalBook-data-entry">
    <!-- 头部导航 -->
    <al-all-head :title="firstProObj.nameAbbr" hairline></al-all-head>
    <!-- 公告 -->
    <n22-notice-bar v-if="false" mode="closable" icon="volumn" scrollable>
      <span class="my-notice-content">当前版本0.0.2</span>
    </n22-notice-bar>
    <!-- 内容区域 -->
    <al-content
      class="proposalBook-data-entry-content"
      :errorMessage="errorMessage"
      upRefreshFun="upRefreshFun"
      @upRefreshFun="queryDataFun"
      :tabs="tabs"
      :isMescrollDown="true"
    >
      <n22-field class="insured-info-c" title="被保人信息">
        <template #head_title_left>
          <img class="title-left-img" src="../assets/images/list1.png" />
        </template>
        <div class="seachCon">
          <n22-input-item
            title="姓名"
            id="insuredname"
            name="insuredname"
            v-model="insured.name"
            data-vv-as="姓名"
            maxlength="10"
            placeholder="请输入您的姓名"
            align="right"
            clearable
            v-input-limit="/[^\a-\z\A-\Z\u4E00-\u9FA5]/g"
            @changeData="$_changeData"
            @click="$_onClick"
            @focus="$_onFocus"
            @blur="$_onBlur"
            @keyup="$_keyup"
          ></n22-input-item>
          <img src="../assets/images/icon2_join_search.png" alt="" class="seachImg" @click="$_showSeach('insured')" />
        </div>
        <n22-radio-item
          v-model="insured.sex"
          title="性别"
          vvalidateModal=""
          name="radio1"
          :itemObject="{ name: 'insured.sex', isCalculate: true }"
          :isAppendTo="false"
          :options="sexOptions"
          plain
          is-show-required
          @changeData="$_changeData"
          @click="$_onClick"
        ></n22-radio-item>
        <n22-drop-select
          class="isBorder my-birthday-c"
          v-model="insured.birthday"
          title="年龄"
          pickerTitle="生日(选填)"
          arrow="calendar"
          :itemObject="{ name: 'insured.birthday', isCalculate: true }"
          :isAppendTo="true"
          :selectDefaultValue="selectDefaultValue"
          is-show-required
          ispickerValue="生日(选填)"
          type="date"
          @changeData="$_changeData"
          @onDatePickerConfirm="$_onPickerConfirm"
        ></n22-drop-select>
        <n22-drop-select
          class="isBorder my-age-c"
          v-model="insured.age"
          pickerTitle="请选择年龄"
          :itemObject="{ name: 'insured.age', isCalculate: true }"
          selectDefaultValue="30"
          :options="ageOptions"
          ispickerValue="请选择年龄"
          type="single"
          :isAppendTo="true"
          @changeData="$_changeData"
          @onPickerConfirm="$_onPickerConfirm"
        ></n22-drop-select>
        <!-- <n22-drop-select
          v-model="insured.occupationCode"
          title="职业"
          pickerTitle="请选择职业"
          :options="workOptions"
          ispickerValue="请选择"
          data-vv-as="职业"
          type="work"
          name="work"
          :itemObject="{ name: 'insured', code: 'occupationLevel', isCalculate: true }"
          :levelArrayProp="[2, 4, 7]"
          :isAppendTo="true"
          notSelectIdf="拒保"
          is-show-required
          @onPickerConfirm="$_onPickerConfirm"
          @changeData="$_changeData"
          @onNotSelectFun="onNotSelectFun"
        ></n22-drop-select> -->
        <n22-cell-item
          :class="['work-cell', insured.addon ? 'work-cell-selected' : '']"
          title="职业"
          :addon="insured.addon ? insured.addon : '请选择'"
          arrow
          @click="workClick('insured')"
        >
          <template slot="left">
            <span class="n22-show-required-star">*</span>
          </template>
        </n22-cell-item>
        <n22-radio-item
          v-model="insured.social"
          title="是否有社保"
          vvalidateModal=""
          name="radio1"
          :itemObject="{ name: 'insured.social', isCalculate: true }"
          :isAppendTo="false"
          :options="socialOptions"
          plain
          is-show-required
          @changeData="$_changeData"
          @click="$_onClick"
        ></n22-radio-item>
      </n22-field>
      <n22-field class="holder-info-c" title="投保人信息">
        <template #head_title_left>
          <img class="title-left-img" src="../assets/images/list1.png" />
        </template>
        <!-- <div class="action-container" slot="action">
          <n22-icon :name="holder.sameInsurant ? 'checked' : 'check'"></n22-icon>
        </div> -->
        <div class="holder-relation">
          <n22-switch-item
            v-model="holder.sameInsurant"
            title="与被保险人是否为同一人"
            :itemObject="{ isCalculate: true }"
            @changeData="$_changeData"
          ></n22-switch-item>
        </div>
        <transition name="n22-base-slide-down">
          <div v-if="!holder.sameInsurant">
            <n22-drop-select
              v-model="holder.relation"
              title="与被保险人关系"
              pickerTitle="请选择关系"
              selectDefaultValue="1"
              :itemObject="{ isCalculate: true }"
              :options="relationOptions"
              ispickerValue="请选择关系"
              type="single"
              :isAppendTo="true"
              is-show-required
              @onPickerConfirm="$_onPickerConfirm"
            ></n22-drop-select>
            <div class="seachCon">
              <n22-input-item
                title="姓名"
                id="holdername"
                name="holdername"
                v-model="holder.name"
                maxlength="10"
                data-vv-as="姓名"
                placeholder="请输入您的姓名"
                align="right"
                clearable
                v-input-limit="/[^\a-\z\A-\Z\u4E00-\u9FA5]/g"
                @changeData="$_changeData"
                @click="$_onClick"
                @focus="$_onFocus"
                @blur="$_onBlur"
              ></n22-input-item>
              <img
                src="../assets/images/icon2_join_search.png"
                alt=""
                class="seachImg"
                @click="$_showSeach('holder')"
              />
            </div>
            <n22-radio-item
              v-model="holder.sex"
              title="性别"
              name="radio1"
              :itemObject="{ name: 'holder.sex' }"
              :isAppendTo="false"
              :options="sexOptions"
              is-show-required
              plain
              @changeData="$_changeData"
              @click="$_onClick"
            ></n22-radio-item>
            <n22-drop-select
              class="isBorder my-birthday-c"
              v-model="holder.birthday"
              title="年龄"
              pickerTitle="生日(选填)"
              arrow="calendar"
              :itemObject="{ name: 'holder.birthday' }"
              :selectDefaultValue="selectDefaultValue"
              :isAppendTo="true"
              is-show-required
              ispickerValue="生日(选填)"
              type="date"
              @changeData="$_changeData"
              @onDatePickerConfirm="$_onPickerConfirm"
            ></n22-drop-select>
            <n22-drop-select
              class="isBorder my-age-c"
              v-model="holder.age"
              pickerTitle="请选择年龄"
              :itemObject="{ name: 'holder.age', isCalculate: true }"
              selectDefaultValue="30"
              :options="ageOptions"
              ispickerValue="请选择年龄"
              type="single"
              :isAppendTo="true"
              @changeData="$_changeData"
              @onPickerConfirm="$_onPickerConfirm"
            ></n22-drop-select>
            <!-- <n22-drop-select
              v-model="holder.occupationCode"
              title="职业"
              pickerTitle="请选择职业"
              :options="workOptions"
              ispickerValue="请选择"
              data-vv-as="职业"
              type="work"
              name="work"
              :itemObject="{ name: 'holder', code: 'occupationLevel', isCalculate: true }"
              :levelArrayProp="[2, 4, 7]"
              :isAppendTo="true"
              is-show-required
              notSelectIdf="拒保"
              @onPickerConfirm="$_onPickerConfirm"
              @changeData="$_changeData"
              @onNotSelectFun="onNotSelectFun"
            ></n22-drop-select> -->
            <n22-cell-item
              :class="['work-cell', holder.addon ? 'work-cell-selected' : '']"
              title="职业"
              :addon="holder.addon ? holder.addon : '请选择'"
              arrow
              @click="workClick('holder')"
            >
              <template slot="left">
                <span class="n22-show-required-star">*</span>
              </template>
            </n22-cell-item>
            <n22-radio-item
              v-model="holder.social"
              title="是否有社保"
              name="social"
              :itemObject="{ name: 'holder.social', isCalculate: true }"
              :isAppendTo="false"
              :options="socialOptions"
              is-show-required
              plain
              @changeData="$_changeData"
              @click="$_onClick"
            ></n22-radio-item>
          </div>
        </transition>
      </n22-field>
      <n22-field title="险种设置">
        <template #head_title_left>
          <img class="title-left-img" src="../assets/images/list2.png" />
        </template>
        <proposal-book-pro-show
          :tableTitle="['险种', '保额', '保费', '交费期间']"
          :firstProObj="firstProObj"
          :masterProData="masterProRetShowData"
          :mainSelect="mainSelect"
          @addPro="$_addPro"
          @changePro="$_changePro"
          @deletePro="$_deletePro"
          is-edit
        ></proposal-book-pro-show>
      </n22-field>
      <n22-field class="doc-info" :class="[platform == 'ios' ? 'ios' : 'android']">
        <div class="doc-arrea">
          <div @click="wordShowClick(1)">
            <img src="../assets/images/product_tk.png" />
            <span>产品条款</span>
          </div>
          <div v-show="isShowGuide" @click="wordShowClick(2)">
            <img src="../assets/images/product_sms.png" />
            <span>产品说明书</span>
          </div>
        </div>
      </n22-field>
    </al-content>
    <!-- 职业弹出 -->
    <gsb-work v-model="workObject" :isPopupShowWork="isPopupShowWork" @selectedWork="selectedWork"></gsb-work>
    <!-- 底部按钮保费 -->
    <n22-action-bar
      class="action-bar-c"
      :actions="buttonArray"
      :disabled="calculateLoading || allPremium == 0"
      :loading="calculateLoading"
    >
      <div class="price">
        <span class="bar-text-desc">首年度总保费:</span>
        <span v-show="!calculateLoading">
          <n22-amount :value="allPremium" has-separator :precision="2"></n22-amount>
        </span>
        <span v-show="calculateLoading" class="n22-calculat-loading-c">
          <n22-activity-indicator type="roller" :size="20"> </n22-activity-indicator>
        </span>
        <small>&nbsp;元</small>
      </div>
    </n22-action-bar>
    <!-- 新增主险选择 -->
    <n22-popup v-model="isPopupShowMainList" position="bottom" @maskClick="riskMainMaskClick" class="pro-main-popup">
      <n22-popup-title-bar title="产品选择" @confirm="riskMainMaskClick()">
        <template slot="confirm">
          <n22-icon name="close" size="lg"></n22-icon>
        </template>
      </n22-popup-title-bar>
      <div class="search">
        <n22-input-item
          v-model="searchProName"
          maxlength="20"
          placeholder="请输入产品名称"
          class="search_query search_query_icon"
          style="position: relative; vertical-align: top;"
        ></n22-input-item>
      </div>
      <!-- :style="{ height: `${screenHeight - allHeadTopPx}px`, 'padding-top': '2px' }" -->
      <div class="pro-main-select-popup-content n22-popup-content">
        <div class="main-select-left-div" :style="{ height: '100%' }">
          <div
            v-for="(item, i) in proTypeList"
            :key="i"
            :style="{
              backgroundColor: mainSelectType === i ? '#ffffff' : '',
              color: mainSelectType === i ? '#ffba03' : '',
              borderRight: mainSelectType === i ? 'none' : '',
            }"
            @click="mainSelectFun(i)"
          >
            <span :class="[mainSelectType === i ? 'line' : '']"></span><span>{{ item.label }}</span>
          </div>
        </div>
        <div class="main-select-right-div" :style="{ height: '100%' }">
          <div
            class="all"
            v-for="(item, i) in proTypeSelectList"
            :key="i"
            @click="mainSelectFun2(item, i)"
            v-show="!item.isAdd"
          >
            <div>{{ item.name && item.name.replace("光大永明", "") }}</div>
            <img v-if="!isProBuy(item)" src="../assets/images/not_buy.png" />
          </div>
          <div class="not-data" v-if="proTypeSelectList.length === 0">暂无数据～</div>
        </div>
      </div>
    </n22-popup>
    <!-- 险种信息填写-主险及附加险录入 -->
    <n22-popup v-model="isPopupShowProEntry" position="bottom" @maskClick="riskMaskClick" class="pro-popup">
      <!-- <transition name="n22-base-fade">
        <div v-show="!isShowConfirm && os === 'ios'" class="n22-popup-mask title-bar-mask" style=""></div>
      </transition> -->
      <n22-popup-title-bar
        :class="[isShowConfirm ? '' : 'pro-title-bar--mask0']"
        :title="masterProData[0] && masterProData[0].nameAbbr"
        @confirm="isShowConfirm && riskMaskClick()"
      >
        <template slot="confirm">
          <n22-icon name="close" size="lg"></n22-icon>
        </template>
      </n22-popup-title-bar>
      <div class="pro-select-popup-content n22-popup-content" v-if="isPopupShowProEntry">
        <div v-for="(master, mi) in masterProData" :key="`master${mi}`">
          <n22-field :title="master.name" @headerClick="mi !== 0 && selectMasterPro(master, mi)">
            <div class="action-container" slot="action">
              <n22-icon
                :style="{ color: mi === 0 ? '#f1eff0' : '' }"
                :name="master.isCheck ? 'checked' : 'check'"
              ></n22-icon>
            </div>
            <transition name="n22-base-fade">
              <div class="pro-popup-cont" v-if="master.isCheck">
                <n22-drop-select
                  v-if="master.choose.pay_freq"
                  class="isBorder"
                  v-model="master.chooseValues.pay_freq"
                  title="交费方式"
                  :options="master.choose.pay_freq"
                  :defaultValue="master.choose.pay_freq[0].value"
                  ispickerValue="请选择"
                  type="single"
                  @dropSelectClick="isShowConfirm = false"
                  @hide="isShowConfirm = true"
                ></n22-drop-select>
                <n22-drop-select
                  v-if="master.choose.pay"
                  class="isBorder"
                  v-model="master.chooseValues.pay"
                  title="交费期间"
                  :itemObject="{ index: mi }"
                  :options="master.choose.pay"
                  :defaultValue="master.choose.pay[0].value"
                  ispickerValue="请选择"
                  type="single"
                  @dropSelectClick="isShowConfirm = false"
                  @hide="isShowConfirm = true"
                  @changeData="changeData_pay"
                ></n22-drop-select>
                <n22-drop-select
                  v-if="master.choose.insure"
                  class="isBorder"
                  v-model="master.chooseValues.insure"
                  title="保险期间"
                  :options="master.choose.insure"
                  :defaultValue="master.choose.insure[0].value"
                  ispickerValue="请选择"
                  type="single"
                  @dropSelectClick="isShowConfirm = false"
                  @hide="isShowConfirm = true"
                ></n22-drop-select>
                <n22-drop-select
                  v-if="master.choose.rank"
                  class="isBorder"
                  v-model="master.chooseValues.rank"
                  title="档次"
                  :options="master.choose.rank"
                  :defaultValue="master.choose.rank[0].value"
                  ispickerValue="请选择"
                  type="single"
                  @dropSelectClick="isShowConfirm = false"
                  @hide="isShowConfirm = true"
                ></n22-drop-select>
                <n22-drop-select
                  v-if="master.choose.draw_age"
                  class="isBorder"
                  v-model="master.chooseValues.draw_age"
                  title="祝寿金领取年龄"
                  :options="master.choose.draw_age"
                  :defaultValue="master.choose.draw_age[0].value"
                  ispickerValue="请选择"
                  type="single"
                  @dropSelectClick="isShowConfirm = false"
                  @hide="isShowConfirm = true"
                ></n22-drop-select>
                <n22-drop-select
                  v-if="master.choose.draw_mode"
                  class="isBorder"
                  v-model="master.chooseValues.draw_mode"
                  title="年金领取方式"
                  :options="master.choose.draw_mode"
                  :defaultValue="master.choose.draw_mode[0].value"
                  ispickerValue="请选择"
                  type="single"
                  @dropSelectClick="isShowConfirm = false"
                  @hide="isShowConfirm = true"
                ></n22-drop-select>
                <n22-drop-select
                  v-if="master.choose.draw_freq"
                  class="isBorder"
                  v-model="master.chooseValues.draw_freq"
                  title="年金领取频率"
                  :options="master.choose.draw_freq"
                  :defaultValue="master.choose.draw_freq[0].value"
                  ispickerValue="请选择"
                  type="single"
                  @dropSelectClick="isShowConfirm = false"
                  @hide="isShowConfirm = true"
                ></n22-drop-select>
                <n22-radio-item
                  v-if="master.choose.option_duty"
                  class="isBorder"
                  v-model="master.chooseValues.option_duty"
                  :defaultValue="[]"
                  title="可选责任"
                  :options="master.choose.option_duty"
                  ispickerValue="请选择"
                  type="checkbox"
                  @dropSelectClick="isShowConfirm = false"
                  @hide="isShowConfirm = true"
                ></n22-radio-item>
                <n22-input-item
                  v-if="master.inputModel === 1"
                  title="份数"
                  v-model="master.quantity"
                  :defaultValue="master.defaultQuantity"
                  placeholder="请输入份数"
                  align="right"
                  type="digit"
                  clearable
                  @changeData="$_changeData"
                  @click="$_onClick"
                  @focus="$_onFocus"
                  @blur="$_onBlur"
                >
                  <template #right>
                    <span>份数</span>
                  </template>
                </n22-input-item>
                <n22-input-item
                  v-if="master.inputModel === 2"
                  title="保险金额"
                  v-model="master.amount"
                  maxlength="10"
                  :defaultValue="master.defaultAmount"
                  placeholder="请输入保额"
                  align="right"
                  type="digit"
                  clearable
                  @changeData="$_changeData"
                  @click="$_onClick"
                  @focus="$_onFocus"
                  @blur="$_onBlur"
                >
                  <template #right>
                    <span>元</span>
                  </template>
                </n22-input-item>
                <n22-input-item
                  v-if="master.inputModel === 4"
                  title="年交保费"
                  v-model="master.premium"
                  maxlength="10"
                  :defaultValue="master.defaultPremium"
                  placeholder="请输入保费"
                  align="right"
                  type="digit"
                  clearable
                  @changeData="$_changeData"
                  @click="$_onClick"
                  @focus="$_onFocus"
                  @blur="$_onBlur"
                >
                  <template #right>
                    <span>元</span>
                  </template>
                </n22-input-item>
                <n22-input-item
                  v-if="master.inputModel === 7"
                  title="一次性支付保险费"
                  v-model="master.fixed"
                  maxlength="10"
                  :defaultValue="master.defaultFixed"
                  placeholder="请输入保费"
                  align="right"
                  type="digit"
                  clearable
                  @changeData="$_changeData"
                  @click="$_onClick"
                  @focus="$_onFocus"
                  @blur="$_onBlur"
                >
                  <template #right>
                    <span>元</span>
                  </template>
                </n22-input-item>
                <!-- <n22-drop-select
                  v-show="master.append && master.append.length > 0"
                  v-model="master.append"
                  :defaultValue="[]"
                ></n22-drop-select>
                <n22-drop-select
                  v-show="master.draw && master.append.draw > 0"
                  v-model="master.draw"
                  :defaultValue="[]"
                ></n22-drop-select> -->
                <div v-if="master.isAppend" class="pro-apend">
                  <n22-cell-item title="追加保费">
                    <template slot="right">
                      <n22-icon name="add_pro" @click="proAppendOrDrawAdd(master.append)"></n22-icon>
                    </template>
                  </n22-cell-item>
                  <div class="pro-apend-entry" v-for="(item, i) in master.append" :key="i">
                    <div class="pro-append-index">{{ i + 1 }}</div>
                    <div class="pro-append-delete" @click="proAppendOrDrawDelete(master.append, i)">
                      <n22-icon name="delete"></n22-icon>
                    </div>
                    <n22-input-item
                      title="追加保费起始年限"
                      v-model="item.startYear"
                      placeholder="请输入"
                      align="right"
                      type="digit"
                      @changeData="$_changeData"
                      @click="$_onClick"
                      @focus="$_onFocus"
                      @blur="$_onBlur"
                    ></n22-input-item>
                    <n22-input-item
                      title="追加保费截止年限"
                      v-model="item.endYear"
                      placeholder="请输入"
                      align="right"
                      type="digit"
                      @changeData="$_changeData"
                      @click="$_onClick"
                      @focus="$_onFocus"
                      @blur="$_onBlur"
                    ></n22-input-item>
                    <n22-input-item
                      title="追加保费"
                      v-model="item.money"
                      placeholder="请输入"
                      align="right"
                      type="digit"
                      @changeData="$_changeData"
                      @click="$_onClick"
                      @focus="$_onFocus"
                      @blur="$_onBlur"
                    ></n22-input-item>
                  </div>
                </div>
                <div v-if="master.isDraw" class="pro-apend draw">
                  <n22-cell-item title="部分领取">
                    <template slot="right">
                      <n22-icon name="add_pro" @click="proAppendOrDrawAdd(master.draw)"></n22-icon>
                    </template>
                  </n22-cell-item>
                  <div class="pro-apend-entry" v-for="(item, i) in master.draw" :key="i">
                    <div class="pro-append-index">{{ i + 1 }}</div>
                    <div class="pro-append-delete" @click="proAppendOrDrawDelete(master.draw, i)">
                      <n22-icon name="delete"></n22-icon>
                    </div>
                    <n22-input-item
                      title="领取起始年限"
                      v-model="item.startYear"
                      placeholder="请输入"
                      align="right"
                      type="digit"
                      @changeData="$_changeData"
                      @click="$_onClick"
                      @focus="$_onFocus"
                      @blur="$_onBlur"
                    ></n22-input-item>
                    <n22-input-item
                      title="领取截止年限"
                      v-model="item.endYear"
                      placeholder="请输入"
                      align="right"
                      type="digit"
                      @changeData="$_changeData"
                      @click="$_onClick"
                      @focus="$_onFocus"
                      @blur="$_onBlur"
                    ></n22-input-item>
                    <n22-input-item
                      title="当年度部分领取金额"
                      v-model="item.money"
                      placeholder="请输入"
                      align="right"
                      type="digit"
                      @changeData="$_changeData"
                      @click="$_onClick"
                      @focus="$_onFocus"
                      @blur="$_onBlur"
                    ></n22-input-item>
                  </div>
                </div>
              </div>
            </transition>
          </n22-field>
        </div>
        <div class="button-yl-h"></div>
      </div>
      <transition name="n22-base-slide-up">
        <n22-button @click="confirmPro" type="primary" class="pro-popup-button">
          确定
        </n22-button>
      </transition>
    </n22-popup>
    <!-- 条款弹出列表 -->
    <n22-popup v-model="isPopupShowTk" position="bottom" @maskClick="riskMaskClick" class="pro-popup">
      <n22-popup-title-bar
        :title="isPopupShowTkType === 1 ? '产品条款' : '产品说明书'"
        @confirm="isPopupShowTk = false"
      >
        <template slot="confirm">
          <n22-icon name="close" size="lg"></n22-icon>
        </template>
      </n22-popup-title-bar>
      <div class="pro-tk-content n22-popup-content" v-if="masterProShowData.length <= 0">
        <n22-field>
          <n22-cell-item
            v-show="isPopupShowTkType === 1 || (isPopupShowTkType === 2 && firstProObj.guide)"
            :title="firstProObj.name"
            arrow
            @click="goWordShow(firstProObj)"
          />
        </n22-field>
      </div>
      <div class="pro-tk-content" v-else>
        <n22-field v-for="(mtk, mtki) in masterProShowData" :key="`mtk${mtki}`">
          <n22-cell-item
            v-show="isPopupShowTkType === 1 || (isPopupShowTkType === 2 && tk.guide)"
            v-for="(tk, tki) in mtk.product"
            :key="`tk${tki}`"
            :title="tk.name"
            arrow
            @click="goWordShow(tk)"
          />
        </n22-field>
      </div>
    </n22-popup>
    <!-- 规则提示 -->
    <n22-dialog
      title="规则提示"
      transition="n22-bounce"
      :closable="false"
      v-model="rulesDialog.open"
      :btns="rulesDialog.btns"
    >
      <div class="dialog-banner" slot="header">
        <img src="../assets/images/tip_head.png" />
      </div>
      <div v-for="(item, i) in rulesDialog.content" :key="i" class="rules-content">
        <div v-for="(itema, ii) in item" :key="ii" class="div-tip">
          <n22-tag
            v-if="ii !== 0"
            size="tiny"
            shape="fillet"
            type="fill"
            fill-color="#FFD055"
            font-weight="normal"
            font-color="#ffffff"
          >
            <span>{{ ii }}</span>
          </n22-tag>
          <span :class="[ii === 0 ? 'pro-name' : 'tip']">{{ itema }}</span>
        </div>
      </div>
    </n22-dialog>
    <!--    本地客户-->
    <!--    <CustomerSearch :value="customerValue.isopen"></CustomerSearch>-->
    <CustomerSearch
      :value="customerValue"
      @closeSeachCuster="closeSeachCuster"
      @changeCustomerValue="changeCustomerValue"
    ></CustomerSearch>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex"; //引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
// 基础组件
import {
  AllHead,
  Content,
  ActionBar,
  ActivityIndicator,
  Amount,
  Button,
  CellItem,
  Dialog,
  DropSelectItem,
  Field,
  FieldItem,
  Icon,
  InputItem,
  Popup,
  PopupTitleBar,
  RadioItem,
  SwitchItem,
  Tag,
  NoticeBar,
  Toast,
} from "al-mobile";
import Fuse from "fuse.js/dist/fuse.min.js";
// 业务组件
import ProShow from "../components/ProShow";
import GsbWork from "@@/components/GsbWork";
import CustomerSearch from "../components/CustomerSearch";
//码表数据
// import masterProData from "../assets/data/masterProData";
import proTypeList from "../assets/data/proTypeList";
import code from "@@/utils/code/";
//工具
import { personCheck, productCheck, dealHuomian, isHuomian } from "./checkData.js";
// const __getAge = require("@t/getAge");
import __getAge from "@t/getAge";
import __getUrlParams from "@t/getUrlParams";
// import _slice from "lodash/slice";
import _cloneDeep from "lodash/cloneDeep";
import _throttle from "lodash/throttle";
import _flattenDepth from "lodash/flattenDepth";
import inputLimit from "@@/utils/inputLimit";
import native from "js-native-n22";
import getAge from "@@/utils/tool";

//service
import { queryData, getProductList, getProductEntry, calculate, saveProposal } from "../service/getData";

export default {
  name: "proposal-book-data-entry", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    //headBottom: {//props定义样例
    //   type: Boolean,
    //   default: true,
    //},
  },
  directives: {
    inputLimit,
  },
  components: {
    [AllHead.name]: AllHead,
    [Content.name]: Content,
    [ActionBar.name]: ActionBar,
    [ActivityIndicator.name]: ActivityIndicator,
    [Amount.name]: Amount,
    [Button.name]: Button,
    [CellItem.name]: CellItem,
    [DropSelectItem.name]: DropSelectItem,
    [Dialog.name]: Dialog,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [InputItem.name]: InputItem,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [ProShow.name]: ProShow,
    [RadioItem.name]: RadioItem,
    [SwitchItem.name]: SwitchItem,
    [Icon.name]: Icon,
    [Tag.name]: Tag,
    [NoticeBar.name]: NoticeBar,
    [GsbWork.name]: GsbWork,
    [CustomerSearch.name]: CustomerSearch,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
    ...mapState(["proposalBook"]),
    dealValue() {
      return value => {
        console.log("%c dealValue", "color:green;");
        if (!value) {
          value = [];
          return false;
        }
        return true;
      };
    },
    getShowProTk() {
      if (this.masterProShowData.length <= 0) {
        return [this.firstProObj];
      } else {
        const tkList = _flattenDepth(this.masterProShowData, 1);
        console.log("%c tkList", "color:green;", tkList);
        return tkList;
      }
    },
    isShowGuide() {
      let index = -1;
      for (let m = 0; m < this.masterProShowData.length; m++) {
        const mlist = this.masterProShowData[m];
        index = mlist.product.findIndex(item => item.guide !== undefined && item.guide !== "" && item.guide !== null);
        if (index > -1) return true;
      }
      console.log("%c isShowGuide-index", "color:#00CD00", index);
      return index > -1;
    },
    isProBuy() {
      return item => {
        return new Date(item.saleEndTime.replace(/-/g, "/")).getTime() >= new Date().getTime();
      };
    },
  },
  activated() {
    // this.queryDataFun();
  },
  async mounted() {
    console.log("%c data-entry>生命周期>mounted", "color:green;", "");
    for (let i = 1; i < 107; i++) {
      this.ageOptions.push({
        text: `${i}岁`,
        value: i + "",
      });
    }
    //设置初始默认年龄
    this.holder.age = "30";
    this.insured.age = "30";
    // this.masterProData = _cloneDeep(masterProData);
    // this.firstProObj = ma[0];
    this.queryDataFun();
    this.getProductEntryFun(this.productCode, 0, 1);
    // this.agentCode = "1100000006";
    // this.AGENTCODE("1100000006");
    let code = await this.getRecommendCodeFromStorageNative();
    // let code = window.utils.cache.get(window.globalConfig.userInfoCacheKey).agentCode;
    if (code == undefined || code == "") {
      Toast.info("无法正确获取到代理人工号");
    } else {
      this.AGENTCODE(code);
      this.agentCode = code;
    }
  },
  watch: {
    searchProName(newVal, oldVal) {
      console.log("%c newVal", "color:#00CD00", newVal);
      newVal !== oldVal && this.searchChange(newVal);
    },
  },
  data() {
    return {
      maxDate: new Date("2099-01-01"),
      errorMessage: "",
      tabs: [
        //content组件对象
        {
          label: "默认单个列表不展示",
          name: 0,
          listType: "1",
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: false,
          upCallbackFun: "",
        },
      ],
      proposalId: __getUrlParams("proposalId"),
      //第一主险code
      productCode: __getUrlParams("productCode"),
      //职业
      // workOptions: code.getCodeData("work"),
      insured: {
        //姓名
        name: "",
        //年龄
        birthday: "",
        //性别
        sex: "1",
        age: "",
        occupationCode: "0001001",
        occupationLevel: "1",
        addon: "党政机关、企事业单位负责人和行政管理人员",
        social: true,
      },
      holder: {
        //姓名
        name: "",
        //年龄
        birthday: "",
        //性别
        sex: "2",
        age: "",
        occupationCode: "0001001",
        occupationLevel: "1",
        addon: "党政机关、企事业单位负责人和行政管理人员",
        sameInsurant: true,
        relation: "33",
        social: false,
      },
      selectDefaultValue: `${new Date().getFullYear() - 30}-01-01`,
      isPopupShowWork: false,
      workObject: {},
      relationOptions: code.getCodeData("relation").filter(function(item) {
        return item.value != "1";
      }),
      sexOptions: code.getCodeData("sex"),
      socialOptions: code.getCodeData("social"),
      ageOptions: [],
      //第一主险险种对象
      firstProObj: {},
      //主险录入信息及附加险录入信息合并集合
      masterProData: [],
      //主险录入信息及附加险录入信息合并集合
      masterProShowData: [],
      //主险录入信息及附加险录入信息合并集合--保费成功返回
      masterProRetShowData: [],
      allPremium: 0,
      //保费试算loading
      calculateLoading: false,
      //按钮组
      buttonArray: [
        //底部按钮组
        {
          text: "生成建议书",
          value: "create",
          onClick: this.createPlan,
          disabled: this.allPremium === 0 ? true : false,
        },
      ],
      proTypeList: _cloneDeep(proTypeList),
      proTypeSelectList: [],
      proTypeSelectListSearchData: [],
      isPopupShowMainList: false,
      isPopupShowProEntry: false,
      isShowConfirm: true,
      //条款弹出列表显示标识
      isPopupShowTk: false,
      isPopupShowTkType: 1,
      mainSelect: 0,
      //主险类型列表类型下标
      mainSelectType: 0,
      searchProName: "",
      rulesDialog: {
        open: false,
        btns: [
          {
            text: "确 定",
          },
        ],
      },
      isShow: false,
      customerValue: {
        isopen: false,
        type: "",
        index: "",
        cusItem: {},
        agentCode: "",
      },
      agentCode: "",
      otherInsurantList: [],
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    ...mapMutations([
      //提交vuex-state更改样例
      "WORDSHOW",
      "LSPRODATA",
      "AGENTCODE",
    ]),
    wordShowClick(type) {
      this.isPopupShowTkType = type;
      this.isPopupShowTk = true;
    },
    workClick(type) {
      this.workObject = {
        type: type,
      };
      this.isPopupShowWork = true;
    },
    selectedWork(item) {
      this.isPopupShowWork = false;
      console.log("%c selectedWork-item", "color:green;", item);
      if (item) {
        this[this.workObject.type].occupationCode = item.code;
        this[this.workObject.type].occupationLevel = item.level;
        this[this.workObject.type].addon = item.descr;
        if (this.masterProShowData.length > 0) {
          this.calculateFun(this.holder, this.insured, this.masterProShowData);
        }
      }
    },
    //职业拒保回调
    onNotSelectFun() {
      this.$toast({
        content: "拒保职业",
        icon: "tip",
        iconSvg: true,
        position: "center",
        duration: 3000,
      });
    },
    // 险种搜索
    searchChange: _throttle(function(val) {
      //获取当前已选择主险的数组
      const nowSelectMasterPro = [];
      if (this.masterProRetShowData) {
        this.masterProRetShowData.forEach(mpro => {
          nowSelectMasterPro.push(mpro.code);
        });
      }
      console.log("%c 获取当前已选择主险的数组>>>>nowSelectMasterPro", "color:green;", nowSelectMasterPro);
      //将数据进行筛选相应的类型
      this.proTypeSelectList = this.proTypeSelectListSearchData.filter(item => {
        return (
          (this.mainSelectType === 0 ? true : item.type == this.mainSelectType) &&
          nowSelectMasterPro.indexOf(item.code) < 0
        );
      });
      if (!val) {
        // this.proTypeSelectList = _cloneDeep(this.proTypeSelectListSearchData);
        return;
      }
      const options = {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          //比重模糊搜索比重设置
          {
            name: "name",
            weight: 0.3,
          },
          {
            name: "alias",
            weight: 0.7,
          },
        ],
      };
      let list = _cloneDeep(this.proTypeSelectList);
      console.log("%c mainProList", "color:#00CD00", list);
      console.log("%c val>>>>>>>>>>>>>", "color:#00CD00", val);
      const fuse = new Fuse(list, options, 0);
      const result = fuse.search(val);
      console.log("%c result", "color:#00CD00", result);
      this.proTypeSelectList = [];
      result.forEach(mp => {
        this.proTypeSelectList.push(mp.item);
      });
    }, 200),
    $_onFocus(name) {
      console.log("%c $_onFocus", "color:green;", name);
    },
    $_onBlur(name) {
      console.log("%c $_onBlur", "color:green;", name);
    },
    $_keyup(name, event) {
      console.log("%c $_keyup", "color:green;", event);
      // event.target.value = event.target.value.replace(/[^a-zA-Z\u4e00-\u9fa5 ]/g, "");
    },
    $_onClick(e) {
      console.log("%c $_onClick", "color:green;", e);
    },
    //更改回调
    // eslint-disable-next-line no-unused-vars
    $_changeData({ name, isCalculate }, val, oldval, isHand, type, key) {
      console.log("%c $_changeData-name", "color:green;", name);
      console.log("%c $_changeData-isCalculate", "color:green;", isCalculate);
      console.log("%c $_changeData", "color:green;", val);
      if (isCalculate && this.masterProShowData.length > 0) {
        this.calculateFun(this.holder, this.insured, this.masterProShowData);
      }
    },
    //更改回调--pay缴费期间
    // eslint-disable-next-line no-unused-vars
    changeData_pay({ index }, val, oldval, isHand, type, key) {
      if (index === 0) {
        console.log("%c changeData_pay-name", "color:green;", name);
        console.log("%c changeData_pay", "color:green;", val);
        dealHuomian(this.masterProData, val, this);
      }
    },
    // eslint-disable-next-line no-unused-vars
    $_onPickerConfirm({ name, code }, val, oldval, isHand, option, key) {
      console.log("%c $_onPickerConfirm-name", "color:green;", name);
      console.log("%c $_onPickerConfirm-option", "color:green;", option);
      console.log("%c $_onPickerConfirm", "color:green;", val);
      if (name) {
        let objKey = name.split(".")[0];
        if (name === `${objKey}.birthday`) {
          this[objKey].age = __getAge(val) === 0 ? "0" : __getAge(val) + "";
          console.log("%c this." + objKey + ".age", "color:red", this[objKey].age);
        } else if (name === `${objKey}.age`) {
          this[objKey].birthday && (this[objKey].birthday = "");
        }
      }
      if (code === "occupationLevel") {
        this[name][code] = option.level;
      }
    },
    //修改按钮点击
    $_changePro(item, i) {
      console.log("%c change", "color:#00CD00", item);
      const ruleData = personCheck([[this.insured, "被保人"], this.holder.sameInsurant ? [] : [this.holder, "投保人"]]);
      if (ruleData) {
        this.$toast({
          content: `${ruleData}！`,
          position: "center",
          maxTextNum: 100,
          duration: 3000,
        });
      } else {
        this.getProductEntryFun(item.code, i, 3, item);
      }
    },
    $_deletePro(item, i) {
      console.log("%c delete", "color:#00CD00", item);
      console.log("%c this.masterProShowData>>删除前", "color:#00CD00", this.masterProShowData);
      this.masterProShowData.splice(i, 1);
      console.log("%c this.masterProShowData>>删除后", "color:#00CD00", this.masterProShowData);
      this.calculateFun(this.holder, this.insured, this.masterProShowData);
    },
    dealMainTypeListFun() {
      //处理数组显示为tab类型
      // this.proTypeSelectList = data;
      // searchData && (this.proTypeSelectListSearchData = searchData);
      this.isPopupShowMainList = true;
      this.searchChange(this.searchProName);
    },
    $_addPro() {
      if (this.proTypeSelectListSearchData && this.proTypeSelectListSearchData.length > 0) {
        // 存在数据直接取存在的数据
        console.log("%c 存在数据直接取存在的数据", "color:green;", this.proTypeSelectListSearchData);
        this.dealMainTypeListFun();
      } else {
        // let req = { type: !i || i === 0 ? "" : i + 1 };
        let req = { type: "" };
        getProductList({ data: req, method: "get" }).then(
          data => {
            console.log("%c data ", "color:green;", data);
            this.proTypeSelectListSearchData = data.data;
            //处理数组显示为tab类型
            this.dealMainTypeListFun();
          },
          err => {
            console.log("%c err ", "color:green;", err);
          },
        );
      }
    },
    mainSelectFun(i) {
      this.mainSelectType = i;
      // this.$_addPro(i);
      this.searchChange(this.searchProName);
    },
    mainSelectFun2(item, i) {
      this.getProductEntryFun(item.code, i, 2);
      this.closeMainProPopup();
    },
    goWordShow(tk) {
      const outLink = `//${this.isPopupShowTkType === 1 ? tk.terms : tk.guide}`;
      this.WORDSHOW({ title: tk.name, url: outLink });
      this.go("/proposalBook/wordShow", { isPdf: true });
    },
    closeMainProPopup() {
      this.isPopupShowMainList = false;
      this.searchProName = "";
    },
    riskMainMaskClick() {
      //蒙层点击取消
      this.closeMainProPopup();
    },
    riskMaskClick() {
      //蒙层点击取消
      this.isPopupShowProEntry = false;
    },
    $_showSeach(tag) {
      this.customerValue.isopen = !this.customerValue.isopen;
      this.customerValue.type = tag;
      this.customerValue.agentCode = this.agentCode;
      console.log("%c $_showSeach>>>>data", "color:green;", "$_showSeach");
      console.log("%c $_showSeach>>>>data", "color:green;", this.customerValue.isopen);
    },
    closeSeachCuster() {
      this.customerValue.isopen = !this.customerValue.isopen;
    },
    changeCustomerValue(item) {
      this.customerValue = item;
      this.customerValue.isopen = false;
      console.log("选中客户===>", item);
      this.$nextTick(() => {
        if (this.customerValue.type == "holder") {
          this.changeCust(this.holder, this.customerValue);
          // this.$set(this.holder, "sex", this.customerValue.cusItem.sex);
        } else if (this.customerValue.type == "insured") {
          this.changeCust(this.insured, this.customerValue);
          // this.$set(this.insured, "sex", this.customerValue.cusItem.sex);
        }
      });
    },
    changeCust(obj1, obj2) {
      obj1.name = obj2.cusItem.name;
      obj1.birthday = obj2.cusItem.birthDay;
      if (obj2.cusItem.birthDay && obj2.cusItem.birthDay != "") {
        // obj1.age = gsbUtils.common.getAge(obj2.cusItem.birthDay);
        obj1.age = getAge.getAge(obj2.cusItem.birthDay);
      }
      obj1.addon = obj2.cusItem.occupationName; //appOccupation
      obj1.level = obj2.cusItem.occupationType;
      obj1.profession = obj2.cusItem.occupationCode;
      obj1.idType = obj2.cusItem.idType;
      obj1.idNo = obj2.cusItem.idNo;
      // obj1.mobile = obj2.cusItem.mobile;
      obj1.social = obj2.cusItem.social == 1 ? true : false;
      obj1.sex = obj2.cusItem.sex;
    },

    /**
     * 数据回显
     * id
     */
    queryDataFun() {
      if (!this.proposalId) {
        return;
      }
      const axiosParams = {
        isLoadding: true,
        loaddingText: "数据查询中...",
      };
      const params = {
        proposalId: this.proposalId,
      };
      queryData({ data: params, config: axiosParams, method: "get" }).then(
        data => {
          console.log("%c getProductEntry>>>>data", "color:green;", data);
          this.holder = data.data.applicant;
          this.insured = data.data.insurant;
          this.masterProRetShowData = data.data.premiumInfo.families;
          this.masterProShowData = data.data.valueFamilies;
          // this.masterProShowData.forEach((mma, mmi) => {
          //   mma.product.forEach(ma => {
          //     console.log("%c mmimmimmimmimmi", "color:green;", mmi);
          //     for (let mei = 0; mei < data.data.entryArgsFamilies[mmi].entryArgsList.length; mei++) {
          //       const me = data.data.entryArgsFamilies[mmi].entryArgsList[mei];
          //       if (ma.code === me.code) {
          //         ma.choose = me.choose;
          //       }
          //     }
          //   });
          // });
          this.allPremium = data.data.premiumInfo.premium;
        },
        err => {
          console.log("%c getProductEntry>>>>err", "color:green;", err);
          this.errorMessage = err.message;
        },
      );
    },
    /**
     * 处理录入项的追加or领取
     */
    dealAppendOrDrawFun(data) {
      data.forEach(mpro => {
        mpro.isAppend = _cloneDeep(mpro.append);
        mpro.append = [];
        // mpro.append = mpro.isAppend
        //   ? [
        //       {
        //         endYear: "",
        //         money: "",
        //         startYear: "",
        //       },
        //     ]
        //   : [];
        mpro.isDraw = _cloneDeep(mpro.draw);
        mpro.draw = [];
        // mpro.draw = mpro.isDraw
        //   ? [
        //       {
        //         endYear: "",
        //         money: "",
        //         startYear: "",
        //       },
        //     ]
        //   : [];
      });
      return data;
    },
    /**
     * 获取险种的录入参数
     * @param(number) i 所选主险的下标
     * @param(number) isMounted 是否初始化-默认underfinde
     * @param(number) type 1-初始化逻辑，2-新增逻辑， 3-修改逻辑
     */
    getProductEntryFun(code, i, type) {
      const axiosParams = {
        isLoadding: true,
        loaddingText: "数据请求中...",
      };
      const params = {
        code: code,
      };
      getProductEntry({ data: params, config: axiosParams, method: "get" }).then(
        data => {
          console.log("%c getProductEntry>>>>data", "color:green;", data);
          //处理返回的追加、领取字段
          const ma = this.dealAppendOrDrawFun(_cloneDeep(data.data));
          this.masterProData = ma;
          //默认点击第一个主险的修改时候，如果是初始化的状态，则将其选中
          if (!this.masterProData[0].isCheck) {
            this.masterProData[0].isCheck = true;
            // this.$set(this.masterProData, 0, this.masterProData[0]);
          }
          if (type === 1) {
            this.firstProObj = _cloneDeep(ma[0]);
          } else if (type === 2) {
            this.mainSelect = this.masterProRetShowData.length; //新增的时候设置最新的下标
            this.isPopupShowProEntry = true;
          } else if (type === 3) {
            this.mainSelect = i;
            //录入对象塞入回显值
            this.masterProShowData.forEach(mma => {
              if (mma.product[0].code === code) {
                mma.product.forEach(ma => {
                  this.masterProData.forEach(me => {
                    if (ma.code === me.code) {
                      !me.isCheck && (me.isCheck = true);
                      me.chooseValues = ma.chooseValues;
                      ma.amount && (me.amount = ma.amount);
                      ma.premium && (me.premium = ma.premium);
                      ma.append && (me.append = ma.append);
                      ma.draw && (me.draw = ma.draw);
                      ma.quantity && (me.quantity = ma.quantity);
                      ma.fixed && (me.fixed = ma.fixed);
                    }
                  });
                });
              }
            });
            console.log("%c 处理回显后的>>>>>>>masterProData", "color:green;", this.masterProData);
            this.isPopupShowProEntry = true;
          }
        },
        err => {
          console.log("%c getProductEntry>>>>err", "color:green;", err);
        },
      );
    },
    /**
     * 保费试算
     * @param(Object) holder 投保人信息
     * @param(Object) insured 被保人信息
     * @param(Object) productList 产品信息
     * @param(Object) isLoadding 保费试算是否展示加载loading
     * @param(Object) ls 险种录入信息弹出确定后如果报错--则需要一个确定前的临时数据更新处理后的数据
     */
    calculateFun: _throttle(function(holder, insured, productList, isLoadding, ls) {
      console.log("%c 保费试算>>>calculateFun>>>投保人", "color:#ffba03;", _cloneDeep(holder));
      console.log("%c 保费试算>>>calculateFun>>>被保人", "color:#ffba03;", _cloneDeep(insured));
      console.log("%c 保费试算>>>calculateFun>>>险种", "color:#ffba03;", _cloneDeep(productList));
      const ruleDatap = personCheck([
        [this.insured, "被保人"],
        this.holder.sameInsurant ? [] : [this.holder, "投保人"],
      ]);
      if (ruleDatap) {
        this.$toast({
          content: `${ruleDatap}！`,
          position: "bottom",
          maxTextNum: 100,
          duration: 3000,
        });
        return;
      }
      const ruleData = productCheck(productList);
      if (ruleData) {
        this.$toast({
          content: `${ruleData}！`,
          position: "bottom",
          maxTextNum: 100,
          duration: 3000,
        });
        return;
      }
      this.calculateLoading = true;
      let families = _cloneDeep(productList);
      // p[0].product[0].amount = 50000;
      // p[0].product[0].append = [];
      // p[0].product[0].draw = [];
      const axiosParams = {
        isLoadding: isLoadding || false,
        loaddingText: "保费试算中...",
      };
      const params = {
        applicant: holder,
        insurant: insured,
        families: families,
      };
      calculate({ data: params, config: axiosParams }).then(
        data => {
          console.log("%c calculate>>>>>data", "color:green;", data);
          this.masterProRetShowData = data.data.families;
          ls && (this.masterProShowData = ls);
          this.allPremium = data.data.premium;
          //关闭popup
          this.isPopupShowProEntry = false;
          this.calculateLoading = false;
        },
        err => {
          console.log("%c calculate>>>>>err", "color:green;", err);
          if (err.bizcode === 1005) {
            //1005保费计算错误
            this.allPremium = 0;
            this.rulesDialog.open = true;
            this.rulesDialog.content = err.body;
            this.calculateLoading = false;
            // this.$toast({
            //   content: `${err.body}！`,
            //   position: "center",
            //   maxTextNum: 100,
            //   duration: 3000,
            // });
          }
        },
      );
    }, 300),
    // 确定选择险种
    confirmPro() {
      //将可选险种数组塞入保存、回显的险种数组中
      let selectProData = this.masterProData.filter(item => {
        return item.isCheck;
      });
      let masterProShowDataLS = _cloneDeep(this.masterProShowData);
      masterProShowDataLS[this.mainSelect] = { product: selectProData };
      // this.masterProShowData[this.mainSelect] = { product: [] };
      // this.$set(this.masterProShowData, this.mainSelect, this.masterProShowData[this.mainSelect]);
      // this.masterProShowData[this.mainSelect].product = selectProData;

      console.log("%c this.masterProData", "color:green;", this.masterProData);
      console.log("%c this.masterProShowData", "color:green;", this.masterProShowData);
      console.log("%c masterProShowDataLS", "color:green;", masterProShowDataLS);
      //触发保费试算
      this.calculateFun(this.holder, this.insured, masterProShowDataLS, true, masterProShowDataLS);
    },
    //险种选取
    selectMasterPro(item, i) {
      if (isHuomian(this.masterProData, item)) {
        //豁免险
        if (
          this.masterProData[0].chooseValues.pay === "single" ||
          this.masterProData[0].chooseValues.pay === "term_3"
        ) {
          this.rulesDialog.open = true;
          this.rulesDialog.content = [
            [
              item.nameAbbr,
              `投保本险种，对应主险的交费方式为${
                this.masterProData[0].chooseValues.pay === "single" ? "趸交" : "3年交"
              }时，不能附加本险种。`,
            ],
          ];
          return;
        }
        if (this.holder.sameInsurant === true) {
          this.rulesDialog.open = true;
          this.rulesDialog.content = [[item.nameAbbr, "投被保人为同一人时，不允许添加豁免险。"]];
          return;
        }
      }
      item.isCheck = !item.isCheck;
      this.$set(this.masterProData, i, item);
    },
    proAppendOrDrawAdd(item) {
      item.push({
        endYear: "",
        money: "",
        startYear: "",
      });
    },
    proAppendOrDrawDelete(item, index) {
      item.splice(index, 1);
    },
    createPlan() {
      const ruleDatap = personCheck([
        [this.insured, "被保人"],
        this.holder.sameInsurant ? [] : [this.holder, "投保人"],
      ]);
      if (ruleDatap) {
        this.$toast({
          content: `${ruleDatap}！`,
          position: "bottom",
          maxTextNum: 100,
          duration: 3000,
        });
        return;
      }
      const axiosParams = {
        isLoadding: true,
        loaddingText: "建议书生成中...",
      };
      const params = {
        applicant: this.holder,
        insurant: this.insured,
        families: _cloneDeep(this.masterProShowData),
      };
      console.log(this.proposalBook.agentCode);
      this.$DataPoint("", {
        value: { aa: { module: "PROPOSAl", eventId: "1003", createBy: this.proposalBook.agentCode }, postParms: true },
      });
      saveProposal({ id: this.proposalId, data: params, config: axiosParams }).then(
        data => {
          console.log("%c getProductEntry>>>>data", "color:green;", data);
          this.LSPRODATA(this.masterProData);
          this.go("/proposalBook/planShow", { proposalId: data.data.proposalId });
        },
        err => {
          console.log("%c getProductEntry>>>>err", "color:green;", err);
        },
      );
    },
    //通过插件获取代理人信息中的工号
    getRecommendCodeFromStorageNative() {
      return new Promise((resolve, reject) => {
        native.storage(
          {
            mode: 2,
            key: "userInfo",
          },
          content => {
            console.log(content);
            resolve(content.object.appLoginUser.agentCode);
          },
          error => {
            reject(error);
          },
        );
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./DataEntry.scss";
</style>
