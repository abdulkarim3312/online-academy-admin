<template>
  <div class="navbar" :class="[{ d_none: $route.name === 'dashboard' }]">
    <div class="navbar_top_content">
      <h2>Online <span>Academy</span></h2>
    </div>
    <ul class="left_nav_list">
      <template
        v-if="
          [
            'parent_list',
            'parent_add',
            'parent_edit',
            'student_list',
            'student_add',
            'student_edit',
          ].includes($route.name)
        "
      >
        <li
          :class="{
            active: ['parent_list', 'parent_add', 'parent_edit'].includes(
              $route.name
            ),
          }"
        >
          <router-link
            :to="{ name: 'parent_list' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic2.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic2-active.png`"
              alt=""
              class="active"
            />
            <span>{{ $t('sidebar.parentMember.parentMember') }}</span>
          </router-link>
        </li>
        <li
          :class="{
            active: ['student_list', 'student_add', 'student_edit'].includes(
              $route.name
            ),
          }"
        >
          <router-link
            :to="{ name: 'student_list' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic3.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic3-active.png`"
              alt=""
              class="active"
            />
            <span>{{ $t('sidebar.studentMember.studentMember') }}</span>
          </router-link>
        </li>
      </template>
      <template
        v-if="
          [
            'course_overview_list', 'course_overview_add', 'course_overview_edit', 'course_requirement_list', 'course_requirement_add', 'course_requirement_edit', 'course_curriculum', 'course_details', 'course_curriculum_edit', 'course_curriculum_add', 'course_curriculum_list'
          ].includes($route.name)
        "
      >
      <li
          :class="{
            active: ['course_details'].includes($route.name),
          }"
        >
          <router-link
            :to="{ name: 'course_details' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-active.png`"
              alt=""
              class="active"
            />
            <span>Course Details</span>
          </router-link>
        </li>
      <li
          :class="{
            active: ['course_overview_list', 'course_overview_add', 'course_overview_edit'].includes($route.name),
          }"
        >
          <router-link
            :to="{ name: 'course_overview_list' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-active.png`"
              alt=""
              class="active"
            />
            <span>Course Overview</span>
          </router-link>
        </li>
        <li
          :class="{
            active: ['course_requirement_list', 'course_requirement_add', 'course_requirement_edit'].includes($route.name),
          }"
        >
          <router-link
            :to="{ name: 'course_requirement_list' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-active.png`"
              alt=""
              class="active"
            />
            <span>Course Requirement</span>
          </router-link>
        </li>
        
        <li
          :class="{
            active: ['course_curriculum_edit', 'course_curriculum_add', 'course_curriculum_list'].includes($route.name),
          }"
        >
          <router-link
            :to="{ name: 'course_curriculum_list' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-active.png`"
              alt=""
              class="active"
            />
            <span>Course Curriculum</span>
          </router-link>
        </li>
      </template>
      <template
        v-if="
          [
            'product_list',
            'product_add',
            'product_edit',
            'product_welcome',
            'product_outcome',
            'product_overview',
            'product_overview_content_list',
            'product_overview_content_add',
            'product_overview_content_edit',
            'product_overview_list',
            'product_overview_add',
            'product_overview_edit',

            'topic_one_content_one',
            'topic_one_content_two',
            'topic_one_content_three',
            'topic_one_content_four',
            'topic_one_content_five',

            'topic_two_content_six',
            'topic_two_content_five',
            'topic_two_content_four',
            'topic_two_content_three',
            'topic_two_content_two',
            'topic_two_content_one',
            
            'topic_three_content_one',
            'topic_three_content_two',
            'topic_four_content_one',
            'topic_four_content_two',
            'extend_learning'
          ].includes($route.name)
        "
      >
        <li
          :class="{
            active: ['product_list', 'product_add', 'product_edit'].includes(
              $route.name
            ),
          }"
        >
          <router-link
            :to="{ name: 'product_add' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-active.png`"
              alt=""
              class="active"
            />
            <span>Product</span>
          </router-link>
        </li>
        <li
          :class="{
            active: ['product_welcome'].includes($route.name),
          }"
        >
          <router-link
            :to="{ name: 'product_welcome' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-active.png`"
              alt=""
              class="active"
            />
            <span>Product Welcome</span>
          </router-link>
        </li>
        <li
          :class="{
            active: ['product_outcome'].includes($route.name),
          }"
        >
          <router-link
            :to="{ name: 'product_outcome' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-active.png`"
              alt=""
              class="active"
            />
            <span>Product Outcome</span>
          </router-link>
        </li>
        <li
          :class="{
            active: [
              'product_overview',
              'product_overview_list',
              'product_overview_add',
              'product_overview_edit',
            ].includes($route.name),
          }"
        >
          <router-link
            :to="{ name: 'product_overview_add' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-active.png`"
              alt=""
              class="active"
            />
            <span>Product Overview</span>
          </router-link>
        </li>
        <li
          :class="{
            active: [
              'product_overview_content_list',
              'product_overview_content_add',
              'product_overview_content_edit',
            ].includes($route.name),
          }"
        >
          <router-link
            :to="{ name: 'product_overview_content_list' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-active.png`"
              alt=""
              class="active"
            />
            <span>Product Overview Content</span>
          </router-link>
        </li>
        <li
          :class="{
            active: [
            'topic_one_content_one',
            'topic_one_content_two',
            'topic_one_content_three',
            'topic_one_content_four',
            'topic_one_content_five',
            ].includes($route.name),
          }"
        >
          <div
            data-toggle="accordion"
            data-target="#topic_one"
            class="left_f_list"
            :class="{
              open: [
                'topic_one_content_one',
                'topic_one_content_two',
                'topic_one_content_three',
                'topic_one_content_four',
                'topic_one_content_five',
              ],
            }"
          >
            <a role="button">
              <img
                :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                alt=""
                class="default"
              />
              <img
                :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                alt=""
                class="active"
              />
              <span>Topic One</span>
            </a>
          </div>
          <ul
            class="sub_accordion first_level"
            id="topic_one"
            :class="{
              current: [
                'topic_one_content_one',
                'topic_one_content_two',
                'topic_one_content_three',
                'topic_one_content_four',
                'topic_one_content_five',
              ],
            }"
          >
            <li
              :class="{
                active: ['topic_one_content_one'].includes(
                  $route.name
                ),
              }"
            >
              <router-link
                :to="{ name: 'topic_one_content_one' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>Topic One Content One</span>
              </router-link>
            </li>
            <li
              :class="{
                active: [
                'topic_one_content_two',
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'topic_one_content_two' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>Topic One Content Two</span>
              </router-link>
            </li>
            <li
              :class="{
                active: [
                'topic_one_content_three'
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'topic_one_content_three' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>Topic One Content Three</span>
              </router-link>
            </li>
            <li
              :class="{
                active: [
                'topic_one_content_four'
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'topic_one_content_four' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>Topic One Content Four</span>
              </router-link>
            </li>
            <li
              :class="{
                active: [
                'topic_one_content_five'
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'topic_one_content_five' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>Topic One Content Five</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li
          :class="{
            active: [
            'topic_two_content_six',
            'topic_two_content_five',
            'topic_two_content_four',
            'topic_two_content_three',
            'topic_two_content_two',
            'topic_two_content_one'
            ].includes($route.name),
          }"
        >
          <div
            data-toggle="accordion"
            data-target="#topic_tow"
            class="left_f_list"
            :class="{
              open: [
                'topic_two_content_six',
                'topic_two_content_five',
                'topic_two_content_four',
                'topic_two_content_three',
                'topic_two_content_two',
                'topic_two_content_one'
              ],
            }"
          >
            <a role="button">
              <img
                :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                alt=""
                class="default"
              />
              <img
                :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                alt=""
                class="active"
              />
              <span>Topic Two</span>
            </a>
          </div>
          <ul
            class="sub_accordion first_level"
            id="topic_tow"
            :class="{
              current: [
                'topic_two_content_five',
                'topic_two_content_four',
                'topic_two_content_three',
                'topic_two_content_two',
                'topic_two_content_one',
                'topic_two_content_six',
              ],
            }"
          >
            <li
              :class="{
                active: ['topic_two_content_one'].includes(
                  $route.name
                ),
              }"
            >
              <router-link
                :to="{ name: 'topic_two_content_one' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>Topic Two Content One</span>
              </router-link>
            </li>
            <li
              :class="{
                active: [
                'topic_two_content_two'
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'topic_two_content_two' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>Topic Two Content Two</span>
              </router-link>
            </li>
            <li
              :class="{
                active: [
                'topic_two_content_three'
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'topic_two_content_three' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>Topic Two Content Three</span>
              </router-link>
            </li>
            <li
              :class="{
                active: [
                'topic_two_content_four'
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'topic_two_content_four' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>Topic Two Content Four</span>
              </router-link>
            </li>
            <li
              :class="{
                active: [
                'topic_two_content_five'
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'topic_two_content_five' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>Topic Two Content Five</span>
              </router-link>
            </li>
            <li
              :class="{
                active: [
                'topic_two_content_six'
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'topic_two_content_six' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>Topic Two Content Six</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li
          :class="{
            active: [
            'topic_three_content_one',
            'topic_three_content_two',
            ].includes($route.name),
          }"
        >
          <div
            data-toggle="accordion"
            data-target="#topic_three"
            class="left_f_list"
            :class="{
              open: [
                'topic_three_content_one',
                'topic_three_content_two',
              ],
            }"
          >
            <a role="button">
              <img
                :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                alt=""
                class="default"
              />
              <img
                :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                alt=""
                class="active"
              />
              <span>Topic Three</span>
            </a>
          </div>
          <ul
            class="sub_accordion first_level"
            id="topic_three"
            :class="{
              current: [
                'topic_three_content_one',
                'topic_three_content_two',
              ],
            }"
          >
            <li
              :class="{
                active: ['topic_three_content_one'].includes(
                  $route.name
                ),
              }"
            >
              <router-link
                :to="{ name: 'topic_three_content_one' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>Topic Three Content One</span>
              </router-link>
            </li>
            <li
              :class="{
                active: [
                'topic_three_content_two'
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'topic_three_content_two' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>Topic Three Content Two</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li
          :class="{
            active: [
            'topic_four_content_one',
            'topic_four_content_two'
            ].includes($route.name),
          }"
        >
          <div
            data-toggle="accordion"
            data-target="#topic_four"
            class="left_f_list"
            :class="{
              open: [
              ],
            }"
          >
            <a role="button">
              <img
                :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                alt=""
                class="default"
              />
              <img
                :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                alt=""
                class="active"
              />
              <span>Topic Four</span>
            </a>
          </div>
          <ul
            class="sub_accordion first_level"
            id="topic_four"
            :class="{
              current: [
                'topic_four_content_one',
                'topic_four_content_two'
              ],
            }"
          >
            <li
              :class="{
                active: ['topic_four_content_one'].includes(
                  $route.name
                ),
              }"
            >
              <router-link
                :to="{ name: 'topic_four_content_one' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>Topic Four Content One</span>
              </router-link>
            </li>
            <li
              :class="{
                active: [
                'topic_four_content_two'
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'topic_four_content_two' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>Topic Four Content Two</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li
          :class="{
            active: ['extend_learning'].includes($route.name),
          }"
        >
          <router-link
            :to="{ name: 'extend_learning' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-active.png`"
              alt=""
              class="active"
            />
            <span>Extend Learning</span>
          </router-link>
        </li>
      </template>
      <template
        v-if="
          ['package_list', 'package_add', 'package_edit'].includes($route.name)
        "
      >
        <li
          :class="{
            active: ['package_list', 'package_add', 'package_edit'].includes(
              $route.name
            ),
          }"
        >
          <router-link
            :to="{ name: 'package_list' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-active.png`"
              alt=""
              class="active"
            />
            <span>Packages</span>
          </router-link>
        </li>
      </template>
      <template v-if="['order_list', 'order_details'].includes($route.name)">
        <li
          :class="{
            active: ['order_list', 'order_details'].includes($route.name),
          }"
        >
          <router-link
            :to="{ name: 'order_list' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-active.png`"
              alt=""
              class="active"
            />
            <span>Order List</span>
          </router-link>
        </li>
      </template>
      <template v-if="['home_banner_section', 'about_us', 'site_logo'].includes($route.name)">
        <li
          :class="{
            active: ['home_banner_section'].includes($route.name),
          }"
        >
          <router-link
            :to="{ name: 'home_banner_section' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-active.png`"
              alt=""
              class="active"
            />
            <span>Home Banner</span>
          </router-link>
        </li>
        <li
          :class="{
            active: ['about_us'].includes($route.name),
          }"
        >
          <router-link
            :to="{ name: 'about_us' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-active.png`"
              alt=""
              class="active"
            />
            <span>About Us</span>
          </router-link>
        </li>
        <li
          :class="{
            active: ['site_logo'].includes($route.name),
          }"
        >
          <router-link
            :to="{ name: 'site_logo' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-active.png`"
              alt=""
              class="active"
            />
            <span>Site Logo</span>
          </router-link>
        </li>
      </template>

      <template
        v-if="
          [
            'orders',
            'order_edit',
            'settings_promotion',
            'settings_promotion_add',
            'settings_promotion_edit',
          ].includes($route.name)
        "
      >
        <li :class="{ active: ['orders', 'order_edit'].includes($route.name) }">
          <router-link
            :to="{ name: 'orders' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-active.png`"
              alt=""
              class="active"
            />
            <span>{{ $t('sidebar.orderManagement.orderManagement') }}</span>
          </router-link>
        </li>
        <li
          :class="{
            active: [
              'settings_promotion',
              'settings_promotion_add',
              'settings_promotion_edit',
            ].includes($route.name),
          }"
        >
          <router-link
            :to="{ name: 'settings_promotion' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
              alt=""
              class="active"
            />
            <span>{{ $t('sidebar.promotion.promotion') }}</span>
          </router-link>
        </li>
      </template>
      <template
        v-if="
          [
            'exam_questions',
            'exam_questions_add',
            'exam_questions_edit',
            'exam_management_exams',
            'exam_management_exam_add',
            'exam_management_exam_edit',
          ].includes($route.name)
        "
      >
        <li
          :class="{
            active: [
              'exam_questions',
              'exam_questions_add',
              'exam_questions_edit',
            ].includes($route.name),
          }"
        >
          <router-link
            :to="{ name: 'exam_questions' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-active.png`"
              alt=""
              class="active"
            />
            <span>{{ $t('sidebar.questions.questions') }}</span>
          </router-link>
        </li>
        <li
          :class="{
            active: [
              'exam_management_exams',
              'exam_management_exam_add',
              'exam_management_exam_edit',
            ].includes($route.name),
          }"
        >
          <router-link
            :to="{ name: 'exam_management_exams' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic1-active.png`"
              alt=""
              class="active"
            />
            <span>{{ $t('sidebar.exams.exams') }}</span>
          </router-link>
        </li>
      </template>

      <template
        v-if="
          [
            'settings_lecture_category',
            'settings_lecture_category_add',
            'settings_lecture_category_edit',
            'settings_subject',
            'settings_subject_add',
            'settings_subject_edit',
            'settings_area',
            'settings_area_add',
            'settings_area_edit',
            'settings_thinking_area',
            'settings_thinking_area_add',
            'settings_thinking_area_edit',
            'settings_portion',
            'settings_portion_add',
            'settings_portion_edit',
            'settings_grade',
            'settings_grade_add',
            'settings_grade_edit',
            'settings_semesters',
            'settings_semester_add',
            'settings_semester_edit',
            'settings_week',
            'settings_week_add',
            'settings_week_edit',
            'settings_textbook_list',
            'settings_textbook_add',
            'settings_textbook_edit',
            'settings_connection_services',
            'settings_connection_service_add',
            'settings_connection_service_edit',
            'settings_chapter',
            'settings_chapter_add',
            'settings_chapter_edit',
            'settings_parkings',
            'settings_parking_add',
            'settings_parking_edit',
            'settings_difficulty',
            'settings_difficulty_add',
            'settings_difficulty_edit',
            'settings_point',
            'settings_point_add',
            'settings_point_edit',
            'settings_exam_type',
            'settings_exam_type_add',
            'settings_exam_type_edit',
            'settings_question_type',
            'settings_question_type_add',
            'settings_question_type_edit',
            'settings_folder_unit',
            'settings_folder_unit_add',
            'settings_folder_unit_edit',
            'settings_folder_grade',
            'settings_folder_grade_add',
            'settings_folder_grade_edit',
            'settings_folder_semester',
            'settings_folder_semester_add',
            'settings_folder_semester_edit',
            'notice_list',
            'notice_add',
            'notice_edit',
            'faq_list',
            'faq_add',
            'faq_edit',
            'faq_category_list',
            'faq_category_add',
            'faq_category_edit',
            'magazine_slider_list',
            'magazine_slider_add',
            'magazine_slider_edit',
            'unit_registration_list',
            'unit_registration_add',
            'unit_registration_edit',
            'test_lecture_list',
            'test_lecture_add',
            'test_lecture_edit',
            'download_list',
            'download_add',
            'download_edit',
          ].includes($route.name)
        "
      >
        
        <li
          :class="{
            active: [
              'test_lecture_list',
              'test_lecture_add',
              'test_lecture_edit',
            ].includes($route.name),
          }"
        >
          <router-link
            :to="{ name: 'test_lecture_list' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
              alt=""
              class="active"
            />
            <span>맛보기 강의</span>
          </router-link>
        </li>
        <li
          :class="{
            active: ['download_list', 'download_add', 'download_edit'].includes(
              $route.name
            ),
          }"
        >
          <router-link
            :to="{ name: 'download_list' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
              alt=""
              class="active"
            />
            <span>{{ $t('sidebar.fileDownload.download') }}</span>
          </router-link>
        </li>
        <li
          :class="{
            active: ['notice_list', 'notice_add', 'notice_edit'].includes(
              $route.name
            ),
          }"
        >
          <router-link
            :to="{ name: 'notice_list' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
              alt=""
              class="active"
            />
            <span>{{ $t('sidebar.notice.notice') }}</span>
          </router-link>
        </li>
        <li
          :class="{
            active: [
              'faq_list',
              'faq_add',
              'faq_edit',
              'faq_category_list',
              'faq_category_add',
              'faq_category_edit',
            ].includes($route.name),
          }"
        >
          <div
            data-toggle="accordion"
            data-target="#faq"
            class="left_f_list"
            :class="{
              open: [
                'faq_list',
                'faq_add',
                'faq_edit',
                'faq_category_list',
                'faq_category_add',
                'faq_category_edit',
              ],
            }"
          >
            <a role="button">
              <img
                :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                alt=""
                class="default"
              />
              <img
                :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                alt=""
                class="active"
              />
              <span>{{ $t('sidebar.faq.faq') }}</span>
            </a>
          </div>
          <ul
            class="sub_accordion first_level"
            id="faq"
            :class="{
              current: [
                'faq_list',
                'faq_add',
                'faq_edit',
                'faq_category_list',
                'faq_category_add',
                'faq_category_edit',
              ],
            }"
          >
            <li
              :class="{
                active: ['faq_list', 'faq_add', 'faq_edit'].includes(
                  $route.name
                ),
              }"
            >
              <router-link
                :to="{ name: 'faq_list' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>{{ $t('sidebar.faq.faq') }}</span>
              </router-link>
            </li>
            <li
              :class="{
                active: [
                  'faq_category_list',
                  'faq_category_add',
                  'faq_category_edit',
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'faq_category_list' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>{{ $t('sidebar.faq_category.faq_category') }}</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li
          :class="{
            active: [
              'magazine_slider_list',
              'magazine_slider_add',
              'magazine_slider_edit',
            ].includes($route.name),
          }"
        >
          <router-link
            :to="{ name: 'magazine_slider_list' }"
            data-toggle="accordion"
            data-target="#WIP"
            class="left_f_list no_arrow"
          >
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
              alt=""
              class="default"
            />
            <img
              :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
              alt=""
              class="active"
            />
            <span>{{ $t('sidebar.magazine_slider.magazine_slider') }}</span>
          </router-link>
        </li>

        <li
          :class="{
            active: [
              'settings_lecture_category',
              'settings_lecture_category_add',
              'settings_lecture_category_edit',
              'settings_subject',
              'settings_subject_add',
              'settings_subject_edit',
              'settings_area',
              'settings_area_add',
              'settings_area_edit',
              'settings_thinking_area',
              'settings_thinking_area_add',
              'settings_thinking_area_edit',
              'settings_portion',
              'settings_portion_add',
              'settings_portion_edit',
              'settings_grade',
              'settings_grade_add',
              'settings_grade_edit',
              'settings_semesters',
              'settings_semester_add',
              'settings_semester_edit',
              'settings_week',
              'settings_week_add',
              'settings_week_edit',
              'settings_textbook_list',
              'settings_textbook_add',
              'settings_textbook_edit',
              'settings_connection_services',
              'settings_connection_service_add',
              'settings_connection_service_edit',
              'settings_chapter',
              'settings_chapter_add',
              'settings_chapter_edit',
              'settings_parkings',
              'settings_parking_add',
              'settings_parking_edit',
              'settings_difficulty',
              'settings_difficulty_add',
              'settings_difficulty_edit',
              'settings_point',
              'settings_point_add',
              'settings_point_edit',
              'settings_exam_type',
              'settings_exam_type_add',
              'settings_exam_type_edit',
              'settings_question_type',
              'settings_question_type_add',
              'settings_question_type_edit',
              'settings_folder_unit',
              'settings_folder_unit_add',
              'settings_folder_unit_edit',
              'settings_folder_grade',
              'settings_folder_grade_add',
              'settings_folder_grade_edit',
              'settings_folder_semester',
              'settings_folder_semester_add',
              'settings_folder_semester_edit',
              'unit_registration_list',
              'unit_registration_add',
              'unit_registration_edit',
            ].includes($route.name),
          }"
        >
          <div
            data-toggle="accordion"
            data-target="#attribute"
            class="left_f_list"
            :class="{
              open: [
                'settings_lecture_category',
                'settings_lecture_category_add',
                'settings_lecture_category_edit',
                'settings_subject',
                'settings_subject_add',
                'settings_subject_edit',
                'settings_area',
                'settings_area_add',
                'settings_area_edit',
                'settings_thinking_area',
                'settings_thinking_area_add',
                'settings_thinking_area_edit',
                'settings_portion',
                'settings_portion_add',
                'settings_portion_edit',
                'settings_grade',
                'settings_grade_add',
                'settings_grade_edit',
                'settings_semesters',
                'settings_semester_add',
                'settings_semester_edit',
                'settings_week',
                'settings_week_add',
                'settings_week_edit',
                'settings_textbook_list',
                'settings_textbook_add',
                'settings_textbook_edit',
                'settings_connection_services',
                'settings_connection_service_add',
                'settings_connection_service_edit',
                'settings_chapter',
                'settings_chapter_add',
                'settings_chapter_edit',
                'settings_parkings',
                'settings_parking_add',
                'settings_parking_edit',
                'settings_difficulty',
                'settings_difficulty_add',
                'settings_difficulty_edit',
                'settings_point',
                'settings_point_add',
                'settings_point_edit',
                'settings_exam_type',
                'settings_exam_type_add',
                'settings_exam_type_edit',
                'settings_question_type',
                'settings_question_type_add',
                'settings_question_type_edit',
                'settings_folder_unit',
                'settings_folder_unit_add',
                'settings_folder_unit_edit',
                'settings_folder_grade',
                'settings_folder_grade_add',
                'settings_folder_grade_edit',
                'settings_folder_semester',
                'settings_folder_semester_add',
                'settings_folder_semester_edit',
                'unit_registration_list',
                'unit_registration_add',
                'unit_registration_edit',
              ].includes($route.name),
            }"
          >
            <a role="button">
              <img
                :src="`${baseUrl}assets/media/images/icon/7.png`"
                alt=""
                class="default"
              />
              <img
                :src="`${baseUrl}assets/media/images/icon/7.1.png`"
                alt=""
                class="active"
              />
              <span>{{ $t('common.attribute') }}</span>
            </a>
          </div>
          <ul
            class="sub_accordion first_level"
            id="attribute"
            :class="{
              current: [
                'settings_lecture_category',
                'settings_lecture_category_add',
                'settings_lecture_category_edit',
                'settings_subject',
                'settings_subject_add',
                'settings_subject_edit',
                'settings_area',
                'settings_area_add',
                'settings_area_edit',
                'settings_thinking_area',
                'settings_thinking_area_add',
                'settings_thinking_area_edit',
                'settings_portion',
                'settings_portion_add',
                'settings_portion_edit',
                'settings_grade',
                'settings_grade_add',
                'settings_grade_edit',
                'settings_semesters',
                'settings_semester_add',
                'settings_semester_edit',
                'settings_week',
                'settings_week_add',
                'settings_week_edit',
                'settings_textbook_list',
                'settings_textbook_add',
                'settings_textbook_edit',
                'settings_connection_services',
                'settings_connection_service_add',
                'settings_connection_service_edit',
                'settings_chapter',
                'settings_chapter_add',
                'settings_chapter_edit',
                'settings_parkings',
                'settings_parking_add',
                'settings_parking_edit',
                'settings_difficulty',
                'settings_difficulty_add',
                'settings_difficulty_edit',
                'settings_point',
                'settings_point_add',
                'settings_point_edit',
                'settings_exam_type',
                'settings_exam_type_add',
                'settings_exam_type_edit',
                'settings_question_type',
                'settings_question_type_add',
                'settings_question_type_edit',
                'settings_folder_unit',
                'settings_folder_unit_add',
                'settings_folder_unit_edit',
                'settings_folder_grade',
                'settings_folder_grade_add',
                'settings_folder_grade_edit',
                'settings_folder_semester',
                'settings_folder_semester_add',
                'settings_folder_semester_edit',
                'unit_registration_list',
                'unit_registration_add',
                'unit_registration_edit',
                'home_banner_add',
                'home_banner_edit',
              ].includes($route.name),
            }"
            style="display: block"
          >
            <!-- <li :class="{'active': ['settings_lecture_category','settings_lecture_category_add','settings_lecture_category_edit'].includes($route.name)}">
                                <div data-toggle="accordion" data-target="#WIP" class="left_f_list  no_arrow">
                                    <router-link :to="{name: 'settings_lecture_category'}" >
                                        <img :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`" alt="" class="default">
                                        <img :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`" alt="" class="active">
                                        <span>{{ $t('sidebar.lecture_category.lecture_category') }}</span>
                                    </router-link>
                                </div>
                            </li> -->
            <li
              :class="{
                active: [
                  'settings_subject',
                  'settings_subject_add',
                  'settings_subject_edit',
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'settings_subject' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>{{ $t('sidebar.subjects.subjects') }}</span>
              </router-link>
            </li>
            <li
              :class="{
                active: [
                  'settings_question_type',
                  'settings_question_type_add',
                  'settings_question_type_edit',
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'settings_question_type' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>{{ $t('sidebar.question_types.question_types') }}</span>
              </router-link>
            </li>
            <li
              :class="{
                active: [
                  'settings_folder_grade',
                  'settings_folder_grade_add',
                  'settings_folder_grade_edit',
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'settings_folder_grade' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>{{ $t('sidebar.folder_grades.folder_grades') }}</span>
              </router-link>
            </li>
            <li
              :class="{
                active: [
                  'settings_folder_semester',
                  'settings_folder_semester_add',
                  'settings_folder_semester_edit',
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'settings_folder_semester' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>{{
                  $t('sidebar.folder_semesters.folder_semesters')
                }}</span>
              </router-link>
            </li>
            <li
              :class="{
                active: [
                  'settings_folder_unit',
                  'settings_folder_unit_add',
                  'settings_folder_unit_edit',
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'settings_folder_unit' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>{{ $t('sidebar.folder_units.folder_units') }}</span>
              </router-link>
            </li>
            <li
              :class="{
                active: [
                  'settings_area',
                  'settings_area_add',
                  'settings_area_edit',
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'settings_area' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>{{ $t('sidebar.areas.areas') }}</span>
              </router-link>
            </li>
            <li
              :class="{
                active: [
                  'settings_thinking_area',
                  'settings_thinking_area_add',
                  'settings_thinking_area_edit',
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'settings_thinking_area' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>{{ $t('sidebar.thinking_areas.thinking_areas') }}</span>
              </router-link>
            </li>
            <li
              :class="{
                active: [
                  'settings_portion',
                  'settings_portion_add',
                  'settings_portion_edit',
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'settings_portion' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>{{ $t('sidebar.portions.portions') }}</span>
              </router-link>
            </li>
            <li
              :class="{
                active: [
                  'settings_grade',
                  'settings_grade_add',
                  'settings_grade_edit',
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'settings_grade' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>{{ $t('common.grade') }}</span>
              </router-link>
            </li>
            <li
              :class="{
                active: [
                  'settings_semesters',
                  'settings_semester_add',
                  'settings_semester_edit',
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'settings_semesters' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>{{ $t('sidebar.semesters.semesters') }}</span>
              </router-link>
            </li>
            <!-- <li :class="{'active': ['settings_week','settings_week_add','settings_week_edit'].includes($route.name)}">
                                <div data-toggle="accordion" data-target="#WIP" class="sub_menu  no_arrow">
                                    <router-link :to="{name: 'settings_week'}" >
                                        <img :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`" alt="" class="default">
                                        <img :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`" alt="" class="active">
                                        <span>{{ $t('common.week') }}</span>
                                    </router-link>
                                </div>
                            </li> -->
            <li
              :class="{
                active: [
                  'settings_chapter',
                  'settings_chapter_add',
                  'settings_chapter_edit',
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'settings_chapter' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>{{ $t('common.chapter') }}</span>
              </router-link>
            </li>
            <!-- <li :class="{'active': ['settings_connection_services','settings_connection_service_add','settings_connection_service_edit'].includes($route.name)}">
                                <div data-toggle="accordion" data-target="#WIP" class="sub_menu  no_arrow">
                                    <router-link :to="{name: 'settings_connection_services'}" >
                                        <img :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`" alt="" class="default">
                                        <img :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`" alt="" class="active">
                                        <span>{{ $t('connectionServices') }}</span>
                                    </router-link>
                                </div>
                            </li> -->
            <li
              :class="{
                active: [
                  'settings_difficulty',
                  'settings_difficulty_add',
                  'settings_difficulty_edit',
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'settings_difficulty' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>{{ $t('sidebar.difficulty.difficulty') }}</span>
              </router-link>
            </li>
            <li
              :class="{
                active: [
                  'settings_point',
                  'settings_point_add',
                  'settings_point_edit',
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'settings_point' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>{{ $t('sidebar.point.point') }}</span>
              </router-link>
            </li>
            <!-- <li :class="{'active': ['settings_exam_type','settings_exam_type_add','settings_exam_type_edit'].includes($route.name)}">
                                <div data-toggle="accordion" data-target="#WIP" class="sub_menu  no_arrow">
                                    <router-link :to="{name: 'settings_exam_type'}" >
                                        <img :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`" alt="" class="default">
                                        <img :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`" alt="" class="active">
                                        <span>{{ $t('sidebar.exam_type.exam_type') }}</span>
                                    </router-link>
                                </div>
                            </li> -->

            <li
              :class="{
                active: [
                  'settings_textbook_list',
                  'settings_textbook_add',
                  'settings_textbook_edit',
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'settings_textbook_list' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>{{ $t('common.textBook') }}</span>
              </router-link>
            </li>
            <li
              :class="{
                active: [
                  'settings_parkings',
                  'settings_parking_add',
                  'settings_parking_edit',
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'settings_parkings' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>{{ $t('sidebar.parking.parkings') }}</span>
              </router-link>
            </li>
            <li
              :class="{
                active: [
                  'unit_registration_list',
                  'unit_registration_add',
                  'unit_registration_edit',
                ].includes($route.name),
              }"
            >
              <router-link
                :to="{ name: 'unit_registration_list' }"
                data-toggle="accordion"
                data-target="#WIP"
                class="sub_menu no_arrow"
              >
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4.png`"
                  alt=""
                  class="default"
                />
                <img
                  :src="`${baseUrl}assets/media/images/icon/new-menu-ic4-active.png`"
                  alt=""
                  class="active"
                />
                <span>{{ $t('sidebar.unitManagement.unitRegistration') }}</span>
              </router-link>
            </li>
          </ul>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE,
    };
  },
  computed: {
    ...mapGetters({
      user: 'auth/getUser',
    }),
  },
  mounted() {},
  methods: {
    logout() {
      this.axios.post('/logout').finally(() => {
        this.$store.dispatch('auth/logout');
        this.$router.push({ name: 'login' });
      });
    },
  },
};
</script>
<style scoped>
.d-block {
  display: block !important;
}
.d_none {
  display: none !important;
}

.sub_menu {
  padding: 12px 0px !important;
}
</style>
