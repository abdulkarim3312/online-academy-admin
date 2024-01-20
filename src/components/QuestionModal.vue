<template>
  <div
    class="modal custom_question_modal"
    :class="{ open_modal: showQuestionModal }"
  >
    <div class="modal_overlay"></div>
    <div class="modal_inner">
      <div class="modal_header">
        <!-- <div class="print" v-if="questions && questions.length > 0" @click.prevent="printQuestion()">
                    <img :src="`${baseUrl}assets/media/images/icon/quiz-icon13.png`" alt="">
                </div>  -->
        <span class="close_icon close_icon_sm" @click="closeQuestionModal()"
          >×</span
        >
        <h2>질문 보기</h2>
      </div>
      <div class="modal_wrapper">
        <div class="modal_content modal_1400p">
          <div
            class="custom_quiz_content"
            v-if="allQuestions && allQuestions.length > 0"
          >
            <div
              class="custom_quiz_content_inner"
              v-for="(question, questionIndex) in allQuestions"
              :key="'singleQuestion_' + questionIndex"
            >
              <div
                class="toggler"
                v-if="question.question_type == 'descriptive'"
              >
                <div class="up-in-toggle">
                  <button
                    class="switch_left"
                    :class="{
                      active: checkedValues.includes(
                        'question_' + questionIndex
                      ),
                    }"
                    @click.prevent="qaToggler('question', questionIndex)"
                  >
                    문제
                  </button>
                  <button
                    class="switch_right"
                    :class="{
                      active: checkedValues.includes('answer_' + questionIndex),
                    }"
                    @click.prevent="qaToggler('answer', questionIndex)"
                  >
                    정답
                  </button>
                </div>
              </div>
              <div class="inner_left" id="bara_left">
                <div
                  class="inner_left_custom_height"
                  @scroll.passive="getScroll($event.target, questionIndex)"
                >
                  <div class="question_title">
                    <span class="question_number"
                      >{{ questionIndex + 1 }}.</span
                    >
                    <div v-html="convertTextEditor(question.title)"></div>
                  </div>
                  <!-- <div class="title_wrap"><span class="title_span">{{ questionIndex + 1  }} .</span><div class="question_title" v-html="convertTextEditor(question.title)"></div></div> -->
                  <template v-if="question.question_type == 'descriptive'">
                    <div
                      v-show="
                        checkedValues.includes('question_' + questionIndex)
                      "
                      v-html="convertTextEditor(question.fingerprint)"
                    ></div>
                    <!-- <div v-show="checkedValues.includes('question_'+questionIndex)" @mouseenter="loadCanvas(questionIndex)" @click="loadCanvas(questionIndex)" >
                                            <canvas :width="question.fingerprint_image_width" :height="question.fingerprint_image_height" :id="'questionCanvas_'+questionIndex" :style="{'background-image': 'url('+question.fingerprint_image_url+')', 'background-repeat': 'no-repeat'}"></canvas>
                                        </div> -->
                    <div
                      v-show="
                        !checkedValues.includes('question_' + questionIndex)
                      "
                      v-html="convertTextEditor(question.commentary)"
                    ></div>
                  </template>
                  <template v-else>
                    <div v-html="convertTextEditor(question.fingerprint)"></div>
                  </template>
                </div>
              </div>
              <div class="inner_right">
                <div class="answer_heading">
                  <div class="heading quiz_header_title"></div>
                  <div class="body">
                    <template
                      v-if="question.question_type == 'multiple-choice'"
                    >
                      <div
                        class="answer_multiple_checked"
                        v-if="question.answers.length > 0"
                      >
                        <div
                          class="inner"
                          v-for="(answer, answerIndex) in question.answers"
                          :key="'singleAnswer_' + answerIndex"
                        >
                          <div
                            class="form_radio"
                            :class="{ active: answer.correct_answer }"
                          >
                            <input
                              type="radio"
                              :id="
                                'Checkme_' + questionIndex + '_' + answerIndex
                              "
                              name="radio"
                            />
                            <label
                              :for="
                                'Checkme_' + questionIndex + '_' + answerIndex
                              "
                            >
                              <div>
                                <span>{{ answer.sort }}</span>
                              </div>
                              <div v-if="answer.type == 'text'">
                                <span
                                  v-html="convertTextEditor(answer.answer)"
                                ></span>
                              </div>
                              <div class="img" v-else>
                                <span>
                                  <img :src="answer.image_path" alt="" />
                                </span>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </template>
                    <template v-if="question.question_type == 'descriptive'">
                      <div class="input_option">
                        <div class="size_range_slider">
                          <span class="pr_15">크기 </span>
                          <div class="range-slider">
                            <input
                              class="range-slider__range"
                              type="range"
                              v-model="allQuestions[questionIndex].selectedSize"
                              min="1"
                              max="5"
                            />
                          </div>
                        </div>
                        <div class="input_option_inner">
                          <span class="pr_15">색상 : </span>
                          <div class="form_radio">
                            <input
                              type="radio"
                              :id="'colorBlack_' + questionIndex"
                              value="black"
                              :checked="
                                allQuestions[questionIndex].canvasColor ==
                                  'black' ||
                                !allQuestions[questionIndex].canvasColor
                              "
                              v-model="allQuestions[questionIndex].canvasColor"
                            />
                            <label :for="'colorBlack_' + questionIndex">
                              <div class="radio_inner">
                                <p>검은색</p>
                              </div>
                            </label>
                          </div>
                          <div class="form_radio">
                            <input
                              type="radio"
                              :id="'colorWhite_' + questionIndex"
                              value="white"
                              :checked="
                                allQuestions[questionIndex].canvasColor ==
                                'white'
                              "
                              v-model="allQuestions[questionIndex].canvasColor"
                            />
                            <label :for="'colorWhite_' + questionIndex">
                              <div class="radio_inner">
                                <p>하얀색</p>
                              </div>
                            </label>
                          </div>
                          <div class="form_radio">
                            <input
                              type="radio"
                              :id="'colorRed_' + questionIndex"
                              value="red"
                              :checked="
                                allQuestions[questionIndex].canvasColor == 'red'
                              "
                              v-model="allQuestions[questionIndex].canvasColor"
                            />
                            <label :for="'colorRed_' + questionIndex">
                              <div class="radio_inner">
                                <p>Red</p>
                              </div>
                            </label>
                          </div>
                          <div class="form_radio">
                            <input
                              type="radio"
                              :id="'colorGreen_' + questionIndex"
                              value="green"
                              :checked="
                                allQuestions[questionIndex].canvasColor ==
                                'green'
                              "
                              v-model="allQuestions[questionIndex].canvasColor"
                            />
                            <label :for="'colorGreen_' + questionIndex">
                              <div class="radio_inner">
                                <p>Green</p>
                              </div>
                            </label>
                          </div>
                          <div class="form_radio">
                            <input
                              type="radio"
                              :id="'colorBlue_' + questionIndex"
                              value="blue"
                              :checked="
                                allQuestions[questionIndex].canvasColor ==
                                'blue'
                              "
                              v-model="allQuestions[questionIndex].canvasColor"
                            />
                            <label :for="'colorBlue_' + questionIndex">
                              <div class="radio_inner">
                                <p>Blue</p>
                              </div>
                            </label>
                          </div>
                        </div>
                        <button
                          class="btn btn_common_type_2 width_100p mb_20"
                          @click.prevent="clearCanvas(questionIndex)"
                        >
                          Clear
                        </button>
                      </div>
                    </template>
                    <template v-if="question.question_type == 'short-answer'">
                      <template v-if="question.short_answer_type == 1">
                        <div class="answer_input">
                          <div class="inner width_center_half">
                            <input
                              ref="input_focus"
                              type="text"
                              placeholder=""
                              class="form_global"
                              v-model="
                                allQuestions[questionIndex].general_input_one
                              "
                              @click.prevent="changeActiveInput(0)"
                              @focus="setActiveInput(0)"
                            />
                          </div>
                          <div
                            class="inner width_center_half"
                            v-if="question.general_input_two"
                          >
                            <input
                              type="text"
                              placeholder=""
                              class="form_global"
                              v-model="
                                allQuestions[questionIndex].general_input_two
                              "
                              @click.prevent="changeActiveInput(1)"
                              @focus="setActiveInput(1)"
                            />
                          </div>
                          <div
                            class="inner width_center_half"
                            v-if="question.general_input_three"
                          >
                            <input
                              type="text"
                              placeholder=""
                              class="form_global"
                              v-model="
                                allQuestions[questionIndex].general_input_three
                              "
                              @click.prevent="changeActiveInput(7)"
                              @focus="setActiveInput(7)"
                            />
                          </div>
                          <div
                            class="inner width_center_half"
                            v-if="question.general_input_four"
                          >
                            <input
                              type="text"
                              placeholder=""
                              class="form_global"
                              v-model="
                                allQuestions[questionIndex].general_input_four
                              "
                              @click.prevent="changeActiveInput(8)"
                              @focus="setActiveInput(8)"
                            />
                          </div>
                          <div
                            class="inner width_center_half"
                            v-if="question.general_input_five"
                          >
                            <input
                              type="text"
                              placeholder=""
                              class="form_global"
                              v-model="
                                allQuestions[questionIndex].general_input_five
                              "
                              @click.prevent="changeActiveInput(9)"
                              @focus="setActiveInput(9)"
                            />
                          </div>
                        </div>
                      </template>
                      <template v-else-if="question.short_answer_type == 2">
                        <div
                          class="answer_input"
                          v-if="question.fractional_type == 1"
                        >
                          <div class="inner width_center_half">
                            <input
                              ref="input_focus"
                              type="text"
                              placeholder=""
                              class="form_global"
                              v-model="
                                allQuestions[questionIndex].fractional_input_one
                              "
                              @click.prevent="changeActiveInput(2)"
                              @focus="setActiveInput(2)"
                            />
                            <div class="custom_border"></div>
                            <input
                              type="text"
                              placeholder=""
                              class="form_global"
                              v-model="
                                allQuestions[questionIndex].fractional_input_two
                              "
                              @click.prevent="changeActiveInput(3)"
                              @focus="setActiveInput(3)"
                            />
                          </div>
                        </div>
                        <div
                          class="answer_input"
                          v-if="question.fractional_type == 2"
                        >
                          <div class="inner width_full">
                            <input
                              ref="input_focus"
                              type="text"
                              placeholder=""
                              class="form_global"
                              v-model="
                                allQuestions[questionIndex].fractional_input_one
                              "
                              @click.prevent="changeActiveInput(4)"
                              @focus="setActiveInput(4)"
                            />
                          </div>
                          <div class="inner width_full">
                            <input
                              type="text"
                              placeholder=""
                              class="form_global"
                              v-model="
                                allQuestions[questionIndex].fractional_input_two
                              "
                              @click.prevent="changeActiveInput(5)"
                              @focus="setActiveInput(5)"
                            />
                            <div class="custom_border"></div>
                            <input
                              type="text"
                              placeholder=""
                              class="form_global"
                              v-model="
                                allQuestions[questionIndex]
                                  .fractional_input_three
                              "
                              @click.prevent="changeActiveInput(6)"
                              @focus="setActiveInput(6)"
                            />
                          </div>
                        </div>
                      </template>
                      <template v-else>
                        <div class="answer_input">
                          <div class="inner">
                            <input
                              ref="input_focus"
                              type="text"
                              @click.prevent="changeActiveInput(0)"
                              @focus="setActiveInput(0)"
                              placeholder=""
                              class="form_global"
                            />
                          </div>
                        </div>
                      </template>
                      <div class="custom_calculator_wrap">
                        <div class="nav_tab_wrap">
                          <div class="custom_tabs">
                            <nav class="tabs">
                              <ul class="">
                                <li
                                  :class="{ active: calculatorTabStep == 1 }"
                                  @click.prevent="changeCalculatorTab(1)"
                                >
                                  숫자
                                </li>
                                <li
                                  :class="{ active: calculatorTabStep == 2 }"
                                  @click.prevent="changeCalculatorTab(2)"
                                >
                                  기호
                                </li>
                                <li
                                  :class="{ active: calculatorTabStep == 3 }"
                                  @click.prevent="changeCalculatorTab(3)"
                                >
                                  문자
                                </li>
                              </ul>
                            </nav>
                            <div class="tab_content_wrapper">
                              <div
                                class="tab_content"
                                :class="{ tab_active: calculatorTabStep == 1 }"
                              >
                                <div class="fadein">
                                  <div class="custom_calculator">
                                    <div class="custom_calculator_inner">
                                      <ul>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput(1, questionIndex)
                                            "
                                            >1</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput(2, questionIndex)
                                            "
                                            >2</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput(3, questionIndex)
                                            "
                                            >3</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput(4, questionIndex)
                                            "
                                            >4</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput(5, questionIndex)
                                            "
                                            >5</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput(6, questionIndex)
                                            "
                                            >6</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput(7, questionIndex)
                                            "
                                            >7</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput(8, questionIndex)
                                            "
                                            >8</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput(9, questionIndex)
                                            "
                                            >9</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput(0, questionIndex)
                                            "
                                            >0</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput('.', questionIndex)
                                            "
                                            >.</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              clearInput(questionIndex)
                                            "
                                            ><img
                                              :src="`${baseUrl}assets/media/images/remove_button.png`"
                                              alt=""
                                          /></span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="tab_content"
                                :class="{ tab_active: calculatorTabStep == 2 }"
                              >
                                <div class="fadein">
                                  <div class="custom_calculator">
                                    <div class="custom_calculator_inner">
                                      <ul>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput('+', questionIndex)
                                            "
                                            >+</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput('-', questionIndex)
                                            "
                                            >-</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput('X', questionIndex)
                                            "
                                            >X</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput('÷', questionIndex)
                                            "
                                            >÷</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput('=', questionIndex)
                                            "
                                            >=</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput(':', questionIndex)
                                            "
                                            >:</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput('(', questionIndex)
                                            "
                                            >(</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput(')', questionIndex)
                                            "
                                            >)</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput('<', questionIndex)
                                            "
                                            ><img
                                              class="less_than_image"
                                              :src="`${baseUrl}assets/media/images/less-than.png`"
                                              alt=""
                                          /></span>
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput('>', questionIndex)
                                            "
                                            >></span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput('', questionIndex)
                                            "
                                          ></span>
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              clearInput(questionIndex)
                                            "
                                            ><img
                                              :src="`${baseUrl}assets/media/images/remove_button.png`"
                                              alt=""
                                          /></span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="tab_content"
                                :class="{ tab_active: calculatorTabStep == 3 }"
                              >
                                <div class="fadein">
                                  <div class="custom_calculator">
                                    <div class="custom_calculator_inner">
                                      <ul>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput('㉠', questionIndex)
                                            "
                                            >㉠</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput('㉡', questionIndex)
                                            "
                                            >㉡</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput('㉢', questionIndex)
                                            "
                                            >㉢</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput('㉣', questionIndex)
                                            "
                                            >㉣</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput('㉤', questionIndex)
                                            "
                                            >㉤</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput('㉥', questionIndex)
                                            "
                                            >㉥</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput('㉦', questionIndex)
                                            "
                                            >㉦</span
                                          >
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput('', questionIndex)
                                            "
                                          ></span>
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput('', questionIndex)
                                            "
                                          ></span>
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput('', questionIndex)
                                            "
                                          ></span>
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              changeInput('', questionIndex)
                                            "
                                          ></span>
                                        </li>
                                        <li>
                                          <span
                                            @click.prevent="
                                              clearInput(questionIndex)
                                            "
                                            ><img
                                              :src="`${baseUrl}assets/media/images/remove_button.png`"
                                              alt=""
                                          /></span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'question-modal',
  emits: ['closeModal'],
  components: {},
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE,
      btnClose: true,
      checkedValues: [],
      canvasColor: 'black',
      // selectedSize:'2',
      calculatorTabStep: 1,
      allQuestions: [],
      shortAnswerInput: '',
      activeInput: 0,
      fracActiveInput: '',
      modalScrollTop: 0,
      modalScrollLeft: 0,
      testOffsetLeft: 0,
      testOffsetTop: 0,
    };
  },
  props: {
    showQuestionModal: {
      type: Boolean,
      required: true,
    },
    questions: {
      type: Array,
      required: false,
    },
    questionExam: {
      type: Object,
      required: false,
    },
  },
  created() {
    if (this.questionExam) {
      let questionExamData = this.questionExam;
      this.axios
        .get('/exam-questions', {
          params: { ...questionExamData },
        })
        .then((response) => {
          let examQuestion = response.data.data;
          setTimeout(() => {
            this.getScroll(
              document.getElementsByClassName('inner_left_custom_height'),
              0
            );
          }, 500);

          if (
            examQuestion.exam_sub_type == 'paper-test' ||
            examQuestion.exam_sub_type == 'subject-learning-evaluation'
          ) {
            let questions = examQuestion.exam.questions.reverse();
            questions.forEach((element) => {
              this.allQuestions.push(element.question);
            });
          } else {
            examQuestion.exam.questions.forEach((element) => {
              this.allQuestions.push(element.question);
            });
          }
          this.formatCheckedValues();
        });
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      if (this.$refs.input_focus) {
        this.$refs.input_focus[0].focus();
      }
      if (window.MathJax) {
        window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
      }
    });
    if (this.questions) {
      this.questions.forEach((element, index) => {
        this.allQuestions.push(element);
        setTimeout(() => {
          if (document.querySelector('#questionCanvas_' + index)) {
            this.testOffsetLeft = document
              .querySelector('#questionCanvas_' + index)
              .getBoundingClientRect().left;
            this.testOffsetTop = document
              .querySelector('#questionCanvas_' + index)
              .getBoundingClientRect().top;
          }
        }, 500);
      });

      this.formatCheckedValues();
    }
  },
  updated() {
    this.$nextTick().then(() => {
      if (window.MathJax) {
        window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
      }
    });
  },
  methods: {
    formatCheckedValues() {
      this.allQuestions.forEach((element, index) => {
        if (element.question_type == 'descriptive') {
          this.checkedValues.push('question_' + index);
        }
      });
    },
    convertTextEditor(string) {
      return string;
    },
    printQuestion() {
      let questionId = window.$('.tabs li.active').attr('id');
      let routeData = this.$router.resolve({
        name: 'question_print',
        params: { question_id: JSON.stringify(questionId) },
      });
      window.open(routeData.href, '_blank');
    },
    closeQuestionModal() {
      if (this.btnClose) {
        this.$emit('closeModal');
      }
    },
    qaToggler(type, index) {
      let addElement = '';
      let removeElement = '';
      if (type == 'question') {
        addElement = 'question_' + index;
        removeElement = 'answer_' + index;
      } else {
        addElement = 'answer_' + index;
        removeElement = 'question_' + index;
      }
      let existIndex = this.checkedValues.findIndex(
        (element) => element == removeElement
      );

      if (index > -1) {
        this.checkedValues.splice(existIndex, 1);
      }
      this.checkedValues.push(addElement);
    },
    getScroll(target, index) {
      if (target) {
        this.modalScrollTop = target.scrollTop;
        if (document.querySelector('#questionCanvas_' + index)) {
          this.testOffsetLeft = document
            .querySelector('#questionCanvas_' + index)
            .getBoundingClientRect().left;
          this.testOffsetTop = document
            .querySelector('#questionCanvas_' + index)
            .getBoundingClientRect().top;
        }
      }
    },
    loadCanvas(index) {
      let canvasElement = document.getElementById('questionCanvas_' + index);
      let context = canvasElement.getContext('2d');

      let isDrawing = false;
      let self = this;

      canvasElement.onmousedown = (e) => {
        isDrawing = true;
        context.beginPath();
        context.lineWidth = self.allQuestions[index].selectedSize
          ? self.allQuestions[index].selectedSize
          : '2';
        context.strokeStyle = self.allQuestions[index].canvasColor
          ? self.allQuestions[index].canvasColor
          : 'black';
        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.moveTo(
          e.clientX - this.testOffsetLeft,
          e.clientY - this.testOffsetTop + 0
        );
      };

      canvasElement.onmousemove = (e) => {
        if (isDrawing) {
          context.lineTo(
            e.clientX - this.testOffsetLeft,
            e.clientY - this.testOffsetTop + 0
          );
          context.stroke();
        }
      };

      canvasElement.onmouseup = function () {
        isDrawing = false;
        context.closePath();
      };
    },
    clearCanvas(index) {
      let canvasElement = document.getElementById('questionCanvas_' + index);
      let context = canvasElement.getContext('2d');
      context.clearRect(0, 0, canvasElement.width, canvasElement.height);
    },
    changeCalculatorTab(value) {
      this.calculatorTabStep = value;
    },
    changeInput(number, index) {
      if (this.activeInput == 0) {
        this.allQuestions[index].general_input_one = this.allQuestions[index]
          .general_input_one
          ? '' + this.allQuestions[index].general_input_one + number
          : this.allQuestions[index].general_input_one + number;
      } else if (this.activeInput == 1) {
        this.allQuestions[index].general_input_two =
          '' + this.allQuestions[index].general_input_two + number;
      } else if (this.activeInput == 7) {
        this.allQuestions[index].general_input_three =
          '' + this.allQuestions[index].general_input_three + number;
      } else if (this.activeInput == 8) {
        this.allQuestions[index].general_input_four =
          '' + this.allQuestions[index].general_input_four + number;
      } else if (this.activeInput == 9) {
        this.allQuestions[index].general_input_five =
          '' + this.allQuestions[index].general_input_five + number;
      } else if (this.activeInput == 2) {
        this.allQuestions[index].fractional_input_one =
          '' + this.allQuestions[index].fractional_input_one + number;
      } else if (this.activeInput == 3) {
        this.allQuestions[index].fractional_input_two =
          '' + this.allQuestions[index].fractional_input_two + number;
      }

      if (this.fracActiveInput == 4) {
        this.allQuestions[index].fractional_input_one =
          '' + this.allQuestions[index].fractional_input_one + number;
      } else if (this.fracActiveInput == 5) {
        this.allQuestions[index].fractional_input_two =
          '' + this.allQuestions[index].fractional_input_two + number;
      } else if (this.fracActiveInput == 6) {
        this.allQuestions[index].fractional_input_three =
          '' + this.allQuestions[index].fractional_input_three + number;
      }
    },
    clearInput(index) {
      if (this.activeInput == 0) {
        this.allQuestions[index].general_input_one =
          this.allQuestions[index].general_input_one != null &&
          this.allQuestions[index].general_input_one != ''
            ? this.allQuestions[index].general_input_one.toString().slice(0, -1)
            : '';
      } else if (this.activeInput == 1) {
        this.allQuestions[index].general_input_two = this.allQuestions[
          index
        ].general_input_two.slice(0, -1);
      } else if (this.activeInput == 7) {
        this.allQuestions[index].general_input_three = this.allQuestions[
          index
        ].general_input_three.slice(0, -1);
      } else if (this.activeInput == 8) {
        this.allQuestions[index].general_input_four = this.allQuestions[
          index
        ].general_input_four.slice(0, -1);
      } else if (this.activeInput == 9) {
        this.allQuestions[index].general_input_five = this.allQuestions[
          index
        ].general_input_five.slice(0, -1);
      } else if (this.activeInput == 2) {
        this.allQuestions[index].fractional_input_one = this.allQuestions[
          index
        ].fractional_input_one.slice(0, -1);
      } else if (this.activeInput == 3) {
        this.allQuestions[index].fractional_input_two = this.allQuestions[
          index
        ].fractional_input_two.slice(0, -1);
      }

      if (this.fracActiveInput == 4) {
        this.allQuestions[index].fractional_input_one = this.allQuestions[
          index
        ].fractional_input_one.slice(0, -1);
      } else if (this.fracActiveInput == 5) {
        this.allQuestions[index].fractional_input_two = this.allQuestions[
          index
        ].fractional_input_two.slice(0, -1);
      } else if (this.fracActiveInput == 6) {
        this.allQuestions[index].fractional_input_three = this.allQuestions[
          index
        ].fractional_input_three.slice(0, -1);
      }
    },
    changeActiveInput(number) {
      if ([4, 5, 6].includes(number)) {
        this.activeInput = '';
        this.fracActiveInput = number;
      } else {
        this.fracActiveInput = '';
        this.activeInput = number;
      }
    },
    setActiveInput(value) {
      if ([4, 5, 6].includes(value)) {
        this.activeInput = '';
        this.fracActiveInput = value;
      } else {
        this.fracActiveInput = '';
        this.activeInput = value;
      }
    },
    changeCanvasColorInput(value, index) {
      this.allQuestions[index].canvasColor = value;
    },
  },
};
</script>
<style scoped>
.tab_active {
  display: block;
}
.less_than_image {
  width: 20px;
}
.custom_quiz_content_inner {
  border-bottom: 1px solid #ccc;
  margin-bottom: 70px;
  padding-bottom: 30px;
}
.title_wrap {
  display: flex;
}
.title_span {
  font-size: 20px;
  font-weight: 600;
}
.question_title {
  margin-left: 10px;
}
/* canvas{
        width:100%;
        height:100%;
        position:absolute;
    } */

.quiz_header_title {
  background: #33b1ff;
  color: #fff;
  padding: 15px !important;
  text-align: center;
  border-radius: 10px 10px 0px 0px;
}

@import '../assets/imageresize.css';
</style>
