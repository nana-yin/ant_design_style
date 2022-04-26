<template>
  <div class="testStyle">
    <h1>ant design样式二次封装测试页面</h1>
    <!-- 按钮 -->
    <h2 style="background: #f1f1f1;cursor: pointer;" @click="btnShow = !btnShow">按钮：（点击背景查看或者隐藏）</h2>
    <ul v-if="btnShow">
        <li>
            <div class="testStyle-btn">主按钮</div>
            <div style="font-size: 0;">
                <a-button type="primary">默认按钮</a-button>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-button type="primary" loading>Loading...</a-button>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-button type="primary" disabled>默认按钮</a-button>
            </div>
        </li>
        <li>
            <div class="testStyle-btn">次按钮</div>
            <div style="font-size: 0;">
                <a-button>默认按钮</a-button>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-button class="loading1" loading>Loading...</a-button>
                <div style="padding: 10px 0;"></div>
                <a-button class="ant-btn-loading2">默认按钮</a-button>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-button class="loading2" loading>Loading...</a-button>
                <div style="padding: 10px 0;"></div>
                <a-button class="ant-btn-loading3">默认按钮</a-button>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-button class="loading3" loading>Loading...</a-button>
                <div style="padding: 10px 0;"></div>
                <a-button class="ant-btn-loading4">默认按钮</a-button>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-button class="loading4" loading>Loading...</a-button>
                <div style="padding: 10px 0;"></div>
                <a-button class="ant-btn-loading5">默认按钮</a-button>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-button class="loading5" loading>Loading...</a-button>
            </div>
        </li>
        <li>
            <div class="testStyle-btn">图标按钮</div>
            <div style="font-size: 0;">
                <a-button type="primary" shape="circle" class="primaryIcon">
                    <a-icon type="plus" />添加子指标
                </a-button>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-button shape="circle" class="ant-btn-loading5 primaryIcon">
                    <a-icon type="delete" />
                    批量删除
                </a-button>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-icon type="plus" class="iconBtn"/>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-icon type="check" class="iconBtn iconSuccess" />
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-icon type="stop" class="iconBtn iconDisable" />
            </div>
        </li>
        <li>
            <div class="testStyle-btn">文字按钮</div>
            <div style="padding-bottom: 20px;font-weight: 600;">基础用法：</div>
            <div style="font-size: 0;padding-left: 20px;">
                <a-button type="link" class="textBtn">默认链接</a-button>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-button type="link" class="textBtn primaryLink">主要链接</a-button>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-button type="link" class="textBtn successLink">成功链接</a-button>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-button type="link" class="textBtn warnLink">警告链接</a-button>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-button type="link" class="textBtn errorLink">危险链接</a-button>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-button type="link" class="textBtn infoLink">信息链接</a-button>
            </div>
            <div style="padding: 40px 0 20px;font-weight: 600;">禁用状态：</div>
            <div style="font-size: 0;padding-left: 20px;">
                <a-button type="link" disabled class="textBtn">默认链接</a-button>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-button type="link" disabled class="textBtn primaryLink">主要链接</a-button>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-button type="link" disabled class="textBtn successLink">成功链接</a-button>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-button type="link" disabled class="textBtn warnLink">警告链接</a-button>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-button type="link" disabled class="textBtn errorLink">危险链接</a-button>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-button type="link" disabled class="textBtn infoLink">信息链接</a-button>
            </div>
            <div style="padding: 40px 0 20px;font-weight: 600;">下划线：</div>
            <div style="font-size: 0;padding-left: 20px;">
                <a-button type="link" class="textBtn primaryLink underlink">有下划线</a-button>
                <span style="display: inline-block; margin-right: 20px;"></span>
            </div>
        </li>
        <li>
            <div class="testStyle-btn">不同尺寸</div>
            <div style="display: flex;">
                <div>
                    <div style="padding-bottom: 20px;font-weight: 600;">正常按钮：</div>
                    <div style="font-size: 0;">
                        <a-button type="primary">默认按钮</a-button>
                        <span style="display: inline-block; margin-right: 20px;"></span>
                    </div>
                </div>
                <div>
                    <div style="padding-bottom: 20px;font-weight: 600;">中按钮：</div>
                    <div style="font-size: 0;">
                        <a-button type="primary" class="mediumBtn">默认按钮</a-button>
                        <span style="display: inline-block; margin-right: 20px;"></span>
                    </div>
                </div>
                <div>
                    <div style="font-weight: 600;">小按钮：</div>
                    <div style="font-size: 0;">
                        <a-button type="primary" size="small" class="smallBtn">默认按钮</a-button>
                        <span style="display: inline-block; margin-right: 20px;"></span>
                    </div>
                </div>
            </div>
        </li>
    </ul>
    <hr style="margin: 20px 0"/>
    <!-- 单选框 -->
    <h2 style="background: #f1f1f1;cursor: pointer;" @click="radioShow = !radioShow">单选框：（同上）</h2>
    <ul v-if="radioShow">
        <li>
            <div class="testStyle-btn">基础用法</div>
            <div style="font-size: 0;">
                <a-radio checked>备选项</a-radio>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-radio>备选项</a-radio>
            </div>
        </li>
        <li>
            <div class="testStyle-btn">禁用状态</div>
            <div style="font-size: 0;">
                <a-radio checked disabled>备选项</a-radio>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-radio class="radio_disabled" disabled>备选项</a-radio>
            </div>
        </li>
        <li>
            <div class="testStyle-btn">按钮样式</div>
            <div style="font-size: 0;">
                <a-radio-group v-model="value" button-style="solid" @change="onChange">
                    <a-radio-button value="a">基本面</a-radio-button>
                    <a-radio-button value="b">市场面</a-radio-button>
                </a-radio-group>
            </div>
        </li>
    </ul>
    <hr style="margin: 20px 0"/>
    <!-- 复选框 -->
    <h2 style="background: #f1f1f1;cursor: pointer;" @click="multiShow = !multiShow">复选框：（同上）</h2>
    <ul v-if="multiShow">
        <li>
            <div class="testStyle-btn">基础用法</div>
            <div style="font-size: 0;">
                <a-checkbox checked @change="onChange">备选项</a-checkbox>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-checkbox @change="onChange">备选项</a-checkbox>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-checkbox @change="onChange" indeterminate>全选</a-checkbox>
            </div>
        </li>
        <li>
            <div class="testStyle-btn">禁用状态</div>
            <div style="font-size: 0;">
                <a-checkbox checked disabled class="checkbox-checked_disabled" @change="onChange">备选项</a-checkbox>
                <span style="display: inline-block; margin-right: 20px;"></span>
                <a-checkbox disabled class="checkbox_disabled" @change="onChange">备选项</a-checkbox>
            </div>
        </li>
        <li>
            <div class="testStyle-btn">其他样式</div>
            <div style="font-size: 0;">
                <CheckboxOther :checkboxArr="checkboxArr"/>
            </div>
        </li>
    </ul>
    <hr style="margin: 20px 0"/>
    <!-- 输入框 -->
    <h2 style="background: #f1f1f1;cursor: pointer;" @click="inputShow = !inputShow">输入框：（同上）</h2>
    <ul v-if="inputShow">
        <li>
            <div class="testStyle-btn">基础用法</div>
            <div style="font-size: 0;">
                <div>
                    <span style="display: inline-block;width: 186px;color: #999; font-size: 14px;">正常状态</span>
                    <a-input placeholder="请输入" />
                </div>
                <div style="margin-top: 20px;">
                    <span style="display: inline-block;width: 186px;color: #999; font-size: 14px;">禁用状态</span>
                    <a-input disabled placeholder="请输入" />
                </div>
                <div style="margin-top: 20px;">
                    <span style="display: inline-block;width: 186px;color: #999; font-size: 14px;">必填项</span>
                    <a-form-model
                        ref="ruleForm"
                        :model="form"
                        :rules="rules"
                        :label-col="labelCol"
                        class="inputForm"
                    >
                        <a-form-model-item ref="name" label="必填项" prop="name">
                            <a-input
                                v-model="form.name"
                                @blur="
                                () => {
                                    $refs.name.onFieldBlur();
                                }
                                "
                            />
                        </a-form-model-item>
                    </a-form-model>
                </div>
                <div style="margin-top: 20px;">
                    <span style="display: inline-block;width: 186px;color: #999; font-size: 14px;">可清空</span>
                    <a-input allowClear placeholder="可清空" class="clearInput" />
                </div>
                <div style="margin-top: 20px;">
                    <span style="display: inline-block;width: 186px;color: #999; font-size: 14px;">密码框</span>
                    <a-input-password class="inputPassword" placeholder="密码输入的样式需要js更改" />
                </div>
                <div style="margin-top: 20px;">
                    <span style="display: inline-block;width: 186px;color: #999; font-size: 14px;">带icon的输入框</span>
                    <a-date-picker class="dataPicker"/>
                    <a-input-search placeholder="请输入内容" class="searchInput" @search="onSearch" />
                </div>
                <div style="margin-top: 20px;">
                    <span style="display: inline-block;width: 186px;color: #999; font-size: 14px;">文本域</span>
                    <a-textarea placeholder="请输入内容请输入内容请输入内容请输入内容请输入内容请输入内容" />
                </div>
                <div style="margin-top: 20px;">
                    <span style="display: inline-block;width: 186px;color: #999; font-size: 14px;">复合型输入框</span>
                    <a-input-group compact class="compactInput">
                        <a-select placeholder="请选择">
                            <a-select-option value="1">1</a-select-option>
                            <a-select-option value="2">2</a-select-option>
                        </a-select>
                        <a-input-search placeholder="请输入内容" enter-button @search="onSearch" />
                    </a-input-group>
                </div>
                <div style="margin-top: 20px;">
                    <span style="display: inline-block;width: 186px;color: #999; font-size: 14px;">输入长度限制</span>
                    <TextareaInput :textCount="textCount" />
                </div>
            </div>
        </li>
    </ul>
    <hr style="margin: 20px 0"/>
    <h2 style="background: #f1f1f1;cursor: pointer;" @click="numberShow = !numberShow">计数器：（同上）</h2>
    <ul v-if="numberShow">
        <li>
            <div class="testStyle-btn">基础用法</div>
            <div style="font-size: 0;">
                <div style="color: #999;font-size: 14px;margin-bottom: 20px;">正常状态</div>
                <CounterNumber :disabled="false"/>
                <div style="color: #999;font-size: 14px;margin: 20px 0;">禁用状态</div>
                <CounterNumber :disabled="true"/>
            </div>
        </li>
        <li>
            <div class="testStyle-btn">按钮位置</div>
            <div style="font-size: 0;">
                <div style="color: #999;font-size: 14px;margin-bottom: 20px;">正常状态</div>
                <a-input-number v-model="numberInput" @change="onChange" />
                <div style="color: #999;font-size: 14px;margin: 20px 0;">禁用状态</div>
                <a-input-number v-model="numberInput" disabled @change="onChange" />
            </div>
        </li>
    </ul>
    <hr style="margin: 20px 0"/>
    <h2 style="background: #f1f1f1;cursor: pointer;" @click="selectShow = !selectShow">选择器：（同上）</h2>
    <ul v-if="selectShow" style="display: flex;">
        <li style="margin-right: 60px;">
            <div class="testStyle-btn">单选</div>
            <div style="font-size: 0;">
              <div style="font-size: 14px;color: #999;margin-bottom: 20px;">正常状态</div>
              <a-select placeholder="请选择" @change="handleChange">
                <a-select-option value="jack">大市值</a-select-option>
                <a-select-option value="lucy">中小市值</a-select-option>
                <a-select-option value="disabled" disabled>成长</a-select-option>
              </a-select>
              <div style="font-size: 14px;color: #999;margin: 20px 0;">禁用状态</div>
              <a-select placeholder="请选择" disabled @change="handleChange">
                <a-select-option value="jack">大市值</a-select-option>
                <a-select-option value="lucy">中小市值</a-select-option>
                <a-select-option value="disabled" disabled>成长</a-select-option>
              </a-select>
              <div style="font-size: 14px;color: #999;margin: 20px 0;">可清空单选</div>
              <a-select placeholder="请选择" allowClear @change="handleChange">
                <a-select-option value="jack">大市值</a-select-option>
                <a-select-option value="lucy">中小市值</a-select-option>
                <a-select-option value="disabled" disabled>成长</a-select-option>
              </a-select>
            </div>
        </li>
        <li>
            <div class="testStyle-btn">多选</div>
            <div style="font-size: 0;">
                <div style="color: #999;font-size: 14px;margin-bottom: 20px;">正常状态</div>
                <a-tree-select
                    v-model="value"
                    style="width: 100%"
                    :tree-data="treeData"
                    tree-checkable
                    search-placeholder="Please select"
                />
                <div style="color: #999;font-size: 14px;margin: 20px 0;">禁用状态</div>
                <a-tree-select
                    v-model="value"
                    style="width: 100%"
                    :tree-data="treeData"
                    tree-checkable
                    disabled
                    search-placeholder="Please select"
                />
                <div style="color: #999;font-size: 14px;margin: 20px 0;">删除多选</div>
                <a-tree-select
                    v-model="value"
                    style="width: 100%"
                    :tree-data="treeData"
                    tree-checkable
                    allowClear
                    search-placeholder="Please select"
                />'
            </div>
        </li>
    </ul>
    <hr style="margin: 20px 0"/>
    <h2 style="background: #f1f1f1;cursor: pointer;" @click="selectShow = !selectShow">选择器：（同上）</h2>
  </div>
</template>
<script>
import CheckboxOther from './checkboxOther.vue'
import TextareaInput from './textareaInput.vue'
import CounterNumber from './counterNumber.vue'

export default {
  name: 'Test',
  components: {
    CheckboxOther,
    TextareaInput,
    CounterNumber
  },
  data() {
    return {
        btnShow: false,
        radioShow: false,
        multiShow: false,
        inputShow: false,
        numberShow: false,
        selectShow: true,
        value: 'a',
        numberInput: 1,
        checkboxArr: [{
            name: '全部',
            status: 1
        }, {
            name: '石油石化',
            status: 0
        }],
        labelCol: { span: 2 },
        textCount: 100,
        form: {
            name: ''
        },
        rules: {
            name: [
            { required: true, message: '这里是输入错误原因。', trigger: 'blur' },
            { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
            ]
        },
        treeData: [{
            title: 'Node1',
            value: '0-0',
            key: '0-0'
        },
        {
            title: 'Node2',
            value: '0-1',
            key: '0-1',
            children: [
            {
                title: 'Child Node3',
                value: '0-1-0',
                key: '0-1-0',
                disabled: true,
            },
            {
                title: 'Child Node4',
                value: '0-1-1',
                key: '0-1-1',
            }]
        }],
        value: ['0-0-0']
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    onChange(e) {
      console.log(`checked = ${e.target.value}`);
    },
    onSearch(value) {
      console.log(value);
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
  }
}
</script>
<style>
@import '../../assets/css/initcss.css';
.testStyle {
    background: #fff;
    padding: 20px;
}
.testStyle-btn {
    font-size: 16px;
    margin-bottom: 12px;
}
h1 {
    text-align: center;
}
ul li {
    margin-bottom: 40px;
}
</style>
