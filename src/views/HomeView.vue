<template>
  <div>
    <div class="px-4 py-2"><b>input</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" text="This selector could have also been written as"/>
      <md2-input v-model="inputValue" palette="green" text="green"/>
      <md2-input
        v-model="inputValue"
        palette="green"
        text="green + validation"
        validation-message="validation message"
      />
      <md2-input v-model="inputValue" palette="green" selected text="green + selected"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input text="text" value="value"/>
      <md2-input v-model="inputValue" text="validation" validation-message="validation message"/>
      <md2-input v-model="inputValue" selected text="selected"/>
      <md2-input v-model="inputValue" selected text="validation + selected" validation-message="validation message"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" disabled text="disabled"/>
      <md2-input v-model="inputValue" disabled text="disabled + validation" validation-message="validation message"/>
      <md2-input v-model="inputValue" disabled selected text="disabled + selected"/>
      <md2-input
        v-model="inputValue"
        disabled
        selected
        text="disabled + validation + selected"
        validation-message="validation message"
      />
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, icon</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" icon="face" text="text"/>
      <md2-input v-model="inputValue" icon="face" text="validation" validation-message="validation message"/>
      <md2-input v-model="inputValue" icon="face" selected text="selected"/>
      <md2-input
        v-model="inputValue"
        icon="face"
        selected
        text="validation + selected"
        validation-message="validation message"
      />
      <md2-input v-model="inputValue" disabled icon="face" text="disabled"/>
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, icon-trailing</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" icon-trailing="home" text="text"/>
      <md2-input v-model="inputValue" icon-trailing="home" text="validation" validation-message="validation message"/>
      <md2-input v-model="inputValue" icon-trailing="home" selected text="selected"/>
      <md2-input
        v-model="inputValue"
        icon-trailing="home"
        selected
        text="validation + selected"
        validation-message="validation message"
      />
      <md2-input v-model="inputValue" disabled icon-trailing="home" text="disabled"/>
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, icon, icon-trailing</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" icon="face" icon-trailing="home" text="text"/>
      <md2-input
        v-model="inputValue"
        icon="face"
        icon-trailing="home"
        text="validation"
        validation-message="validation message"
      />
      <md2-input
        v-model="inputValue"
        icon="face"
        icon-trailing="home"
        selected
        text="selected"
      />
      <md2-input
        v-model="inputValue"
        icon="face"
        icon-trailing="home"
        selected
        text="validation + selected"
        validation-message="validation message"
      />
      <md2-input
        v-model="inputValue"
        disabled
        icon="face"
        icon-trailing="home"
        text="disabled"
      />
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, prefix</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" prefix="prefix" text="text"/>
      <md2-input v-model="inputValue" prefix="prefix" text="validation" validation-message="validation message"/>
      <md2-input v-model="inputValue" prefix="prefix" selected text="selected"/>
      <md2-input
        v-model="inputValue"
        prefix="prefix"
        selected
        text="validation + selected"
        validation-message="validation message"
      />
      <md2-input v-model="inputValue" disabled prefix="prefix" text="disabled"/>
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, prefix, icon</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" icon="face" prefix="prefix" text="text"/>
      <md2-input
        v-model="inputValue"
        icon="face"
        prefix="prefix"
        text="validation"
        validation-message="validation message"
      />
      <md2-input
        v-model="inputValue"
        icon="face"
        prefix="prefix"
        selected
        text="selected"
      />
      <md2-input
        v-model="inputValue"
        icon="face"
        prefix="prefix"
        selected
        text="validation + selected"
        validation-message="validation message"
      />
      <md2-input v-model="inputValue" disabled icon="face" prefix="prefix" text="disabled"/>
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, suffix</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" suffix="suffix" text="text"/>
      <md2-input v-model="inputValue" suffix="suffix" text="validation" validation-message="validation message"/>
      <md2-input v-model="inputValue" selected suffix="suffix" text="selected"/>
      <md2-input
        v-model="inputValue"
        selected
        suffix="suffix"
        text="validation + selected"
        validation-message="validation message"
      />
      <md2-input v-model="inputValue" disabled suffix="suffix" text="disabled"/>
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, suffix, icon-trailing</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" suffix="suffix" icon-trailing="home" text="text"/>
      <md2-input
        v-model="inputValue"
        icon-trailing="home"
        suffix="suffix"
        text="validation"
        validation-message="validation message"
      />
      <md2-input
        v-model="inputValue"
        icon-trailing="home"
        selected
        suffix="suffix"
        text="selected"
      />
      <md2-input
        v-model="inputValue"
        icon-trailing="home"
        selected
        suffix="suffix"
        text="validation + selected"
        validation-message="validation message"
      />
      <md2-input
        v-model="inputValue"
        disabled
        icon-trailing="home"
        suffix="suffix"
        text="disabled"
      />
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, align</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" align="left" text="left"/>
      <md2-input v-model="inputValue" align="left" text="left + validation" validation-message="validation message"/>
      <md2-input v-model="inputValue" align="left" selected text="left + selected"/>
      <md2-input
        v-model="inputValue"
        align="left"
        selected
        text="left + validation + selected"
        validation-message="validation message"
      />
      <md2-input v-model="inputValue" align="left" disabled text="left + disabled"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" align="center" text="center"/>
      <md2-input
        v-model="inputValue"
        align="center"
        text="center + validation"
        validation-message="validation message"
      />
      <md2-input v-model="inputValue" align="center" selected text="center + selected"/>
      <md2-input
        v-model="inputValue"
        align="center"
        selected
        text="center + validation + selected"
        validation-message="validation message"
      />
      <md2-input v-model="inputValue" align="center" disabled text="center + disabled"/>
    </div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" align="right" text="right"/>
      <md2-input v-model="inputValue" align="right" text="right + validation" validation-message="validation message"/>
      <md2-input v-model="inputValue" align="right" selected text="right + selected"/>
      <md2-input
        v-model="inputValue"
        align="right"
        selected
        text="right + validation + selected"
        validation-message="validation message"
      />
      <md2-input v-model="inputValue" align="right" disabled text="right + disabled"/>
    </div>

    <div class="px-4 pt-4 pb-2"><b>input, align, arrow</b></div>
    <div class="flex px-4 py-2 gap-2">
      <md2-input v-model="inputValue" align="left" arrow text="left"/>
      <md2-input
        v-model="inputValue"
        align="left"
        arrow
        text="left + validation"
        validation-message="validation message"
      />
      <md2-input v-model="inputValue" align="center" arrow text="center"/>
      <md2-input v-model="inputValue" align="right" arrow text="right"/>
    </div>
  </div>
  <div class="h-96"/>
  <div class="h-96"/>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { Icon } from '../../constructors/Image/Icon'
import { AssociativeType } from '../../constructors/types'
import Md2Input from '../../md2/Md2Input/index.vue'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const file = require('../assets/icons/arrow-left.svg')

Icon.add('test', file)

export default defineComponent({
  name: 'HomeView',
  components: {
    Md2Input
  },
  setup () {
    const data = ref('close')
    const icon = ref('close') as Ref<string | AssociativeType>
    const file = ref() as Ref<File | undefined>
    const toggle = ref(false)

    setInterval(() => {
      // toggle.value = !toggle.value
    }, 1600)

    return {
      data,
      file,
      toggle,
      onClick () {
        data.value = 'https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e'
      },
      onClickIcon () {
        icon.value = {
          value: 'menu',
          disabled: true
        }
      },
      onEmit (e: object) {
        console.log('e', e)
      },
      onFile (e: Event) {
        file.value = (e.target as HTMLInputElement).files?.[0]
      },
      icon,
      hide: ref(),
      disabled: ref(),
      visible: ref(false),
      active: ref(false),
      turn: ref(),
      background: ref(),
      animationShow: ref(),
      inputValue: ref(''),
      text: `
      Карьера до прихода в правительство
Служба в КГБ СССР (1975—1991)

Фото из личного дела сотрудника КГБ
В 1975 году окончил юридический факультет ЛГУ[29], был направлен по распределению на работу в Комитет государственной безопасности[2]. Тогда же прошёл курсы подготовки оперативного состава на Охте («401-я школа») и был аттестован младшим офицером (старший лейтенант юстиции) в системе территориальных органов КГБ СССР[30]. В 1976 году Путин участвовал в расследовании дела, возбуждённого из-за надписи «Вы распинаете свободу, но душа человека не знает оков!», которую Олег Волков и Юлий Рыбаков нанесли на Государев бастион Петропавловской крепости[31]. После 1977 года работал по линии контрразведки в следственном отделе Управления КГБ СССР по Ленинграду и Ленинградской области[11]. Рабочее место Путина находилось в так называемом «Большом доме»[22], в 1979 году прошёл обучение на шестимесячных курсах переподготовки в Высшей школе КГБ.

В 1984 году в звании майора юстиции был откомандирован на обучение на одногодичный факультет Краснознамённого института КГБ, который окончил в 1985 году по специальности «Внешняя разведка». Путин проходил подготовку как по линии легальной, так и нелегальной разведки. Был старостой учебного отделения, изучал немецкий язык[22].

В 1985—1990 годах Путин работал в ГДР[30] по линии внешней разведки КГБ. Его руководителем был начальник советской разведгруппы в Восточной Германии, представитель КГБ СССР при Министерстве госбезопасности ГДР полковник Лазарь Матвеев (рассекречен в мае 2017 года в возрасте 90 лет). Коллегами Путина по службе в Дрездене были, в частности, Сергей Чемезов и Николай Токарев[22][32]. Путин действовал в территориальной разведточке в Дрездене под прикрытием должности директора дрезденского Дома дружбы СССР — ГДР. В сферу интересов советской разведгруппы, как рассказывал в 2018 году сам Путин, входили преимущественно страны Западной Европы — союзники США. Эти государства, прежде всего ФРГ, к середине 1980-х годов разместили на своей территории ракеты средней и меньшей дальности, нацеленные на СССР[22].

В течение командировки по выслуге лет Путин повышен в звании до подполковника и в должности до старшего помощника начальника отдела. Вскоре после падения Берлинской стены, 5 декабря 1989 года толпа немецких демонстрантов пыталась взять штурмом особняк советской резидентуры по улице Angelikastrasse 4 с целью захвата архивов КГБ, однако Путину без применения табельного оружия удалось уговорить собравшихся разойтись. Большой объём секретных оперативных документов он сжёг в печке резидентуры. В январе 1990 года Путин завершил командировку в ГДР и вернулся в Ленинград[22].

В 1989 году был награждён бронзовой медалью «За заслуги» Национальной народной армии ГДР.

После окончания загранкомандировки и возвращения в СССР, по словам Путина, добровольно отказался от перехода в центральный аппарат внешней разведки КГБ в Москве и вернулся в штат первого отдела (разведка с территории СССР) Ленинградского управления КГБ. В 1990 году в здании на Литейном подполковник Путин занимал кабинет № 643. На этом же шестом этаже, в соседнем кабинете, работал Сергей Иванов — в будущем министр обороны РФ, глава администрации президента Путина[11][22].

20 августа 1991 года, когда мэр Ленинграда Собчак отказался выполнять распоряжения ГКЧП, Путин, к тому времени работавший с Собчаком более года, написал рапорт об увольнении из КГБ; отставка была принята[22][33].

Работа в Санкт-Петербурге (1990—1996)
Портал:Политика
Россия
Coat of Arms of the Russian Federation.svg
Статья из серии
Политическая система
России

Конституция Российской Федерации

Всенародное голосование о принятии Конституции (1993)
Внесение поправок:
• 2008
• февраль 2014
• июль 2014
• 2020 (общероссийское голосование)
Президент Российской Федерации

Владимир Путин
Администрация президента
Государственный совет
Совет безопасности
Правительство

Состав правительства
Председатель правительства
Михаил Мишустин
Федеральное собрание

Совет Федерации
Сенаторы
Председатель СФ
Валентина Матвиенко
Государственная дума
Депутаты Госдумы
Председатель Госдумы
Вячеслав Володин
Судебная система

Конституционный суд
Верховный суд
Прокуратура

Федеративное устройство

Субъекты федерации
Республики • Края • Области
Города федерального значения
Автономные области
Автономные округа
Главы субъектов федерации
Федеральные территории
Выборы

Парламентские выборы:
1990 • 1993 • 1995 • 1999 • 2003 •
2007 • 2011 • 2016 • 2021
Президентские выборы:
1991 • 1996 • 2000 • 2004 • 2008 •
2012 • 2018 • 2024
Референдумы: 1991 • 1993
Политические партии
Центральная избирательная комиссия
Внешняя политика
Внутренняя политика
Военное положение
Гражданство России
Оппозиция
Права человека
Сепаратизм
Участие в международных организациях

Основная статья: Работа Владимира Путина в органах власти Ленинграда и Санкт-Петербурга
С начала весны 1990 года основным официальным местом работы Путина был Ленинградский государственный университет, в котором он стал помощником ректора Станислава Меркурьева по международным вопросам. Меркурьев позже рекомендовал Путина Собчаку как исполнительного работника[34].

В мае 1990 года, вскоре после избрания Собчака председателем Ленинградского городского Совета народных депутатов, Путин стал его советником.

С 28 июня 1991 года, после избрания Собчака на пост мэра, — исполняющий обязанности председателя, а с 15 июля — председатель Комитета по внешним связям мэрии Ленинграда (с 16 мая 1992 года — Санкт-Петербурга)[35]. Помимо комитета по внешним связям, Путин руководил комиссией мэрии по оперативным вопросам[34].

В 1992 году депутатской рабочей группой Ленсовета во главе с Мариной Салье и Юрием Гладковым (так называемой «комиссией Салье») против руководителя комитета по внешнеэкономическим связям Путина было выдвинуто обвинение в махинациях в связи с программой снабжения Санкт-Петербурга продовольствием в обмен на сырьё[36][37][38]. Впоследствии, уже исполняя обязанности президента, Путин признал, что продовольствие было поставлено не в полном объёме, однако утверждал, что «в уголовном порядке преследовать было не за что и некого», а расследования комиссия Салье в действительности не проводила[39]. По мнению Путина, этот скандал часть депутатов Ленсовета пыталась использовать для воздействия на Собчака, чтобы тот его уволил[39].

С 1993 года Собчак на время своих зарубежных поездок стал оставлять Путина заместителем вместо себя[40].

В марте 1994 года Путин был назначен первым заместителем председателя правительства Санкт-Петербурга, сохранив за собой должность руководителя комитета по внешним связям[40]. В обязанности Путина как зампреда петербургского правительства входили координация работы и взаимодействие мэрии с территориальными органами силовых и правоохранительных ведомств (ГУВД, Минобороны России, ФСБ России, прокуратура, суды, Таможенный комитет), а также политическими и общественными организациями. В ведении Путина находились регистрационная палата, а также управления мэрии: юстиции, по связям с общественностью, административных органов, гостиниц.

В 1995 году Путин возглавлял региональное отделение партии «Наш дом — Россия»[источник не указан 81 день].

В 1992—1996 годах Путин в числе «реформистски настроенных политических активистов» проходил тренинг по программе американского Национального демократического института международных отношений (англ. National Democratic Institute for International Affairs, NDI)[41].

Летом 1996 года Собчак покинул пост мэра, проиграв выборы, после чего работа Путина в мэрии Санкт-Петербурга закончилась.

Впоследствии многие из тех, кто вместе с Путиным работал в мэрии Санкт-Петербурга (И. И. Сечин, Д. А. Медведев, В. А. Зубков, А. Л. Кудрин, А. Б. Миллер, Г. О. Греф, Д. Н. Козак, В. П. Иванов, С. Е. Нарышкин, В. Л. Мутко и др.), в 2000-е годы заняли ответственные посты в правительстве России, администрации президента России и руководстве государственных компаний[42][43].

Работа в Москве (1996—1999)
В августе 1996 года, после поражения Собчака на губернаторских выборах, Владимир Путин, по собственным воспоминаниям, вновь, как и во дни августовского путча 1991 года, планировал подрабатывать в такси[44]. Бывший вице-мэр Петербурга контр-адмирал Вячеслав Щербаков упоминал, что Путина приглашали в новую администрацию Владимира Яковлева, однако Путин, по свидетельству Игоря Сечина, счёл это предательством и наотрез отказался[45][46].

Вскоре Путин был приглашён на работу в Москву на должность заместителя Павла Бородина, управляющего делами президента. Здесь он курировал юридическое управление и управление российской заграничной собственностью[47]. По мнению писателя Роя Медведева, привлекая к работе Путина, Бородин учёл его опыт в международных деловых связях[48].

26 марта 1997 года Путин был назначен заместителем руководителя Администрации президента России — начальником Главного контрольного управления президента Российской Федерации, сменив на этом посту Алексея Кудрина[47]. На эту должность его пригласил Валентин Юмашев, возглавивший Администрацию президента после того, как прежний руководитель Анатолий Чубайс перешёл на должность первого вице-премьера в правительстве Виктора Черномырдина. По словам Юмашева, именно Чубайс и предложил ему взять в администрацию Владимира Путина — «сильного кандидата, с которым он работал в Петербурге»[49].

По словам Путина, результаты проведённой Главным контрольным управлением проверки, связанной с выполнением оборонного заказа, стали одной из причин отставки министра обороны России Игоря Родионова в мае 1997 года[50].


Директор Федеральной службы безопасности РФ Владимир Путин. 1998 год
В ноябре 1997 года Путин организовал отъезд во Францию Собчака[51], к тому времени проходившего по уголовному делу о злоупотреблениях в мэрии Санкт-Петербурга[52]. Поступок Путина вызвал в Кремле глубокую признательность; так, по мнению Юмашева, этот эпизод повлиял на выбор Путина в качестве преемника Ельцина[53][54].
`
    }
  }
})
</script>

<style/>
