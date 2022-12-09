<template>
  <div class="home flex flex-wrap">
    <div class="relative w-64 h-64">
      <md2-image
        :value="data"
        :hide="hide"
        :disabled="disabled"
      />
      <md2-ripple/>
      <md2-progress :visible="visible"/>
    </div>
    <div class="relative w-64 h-64">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
      />
      <md2-ripple inverse/>
      <md2-progress :value="100" :max="300" bottom/>
    </div>
    <div class="relative w-64 h-64">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        size="200%"
      />
      <md2-progress :visible="visible" type="circular"/>
    </div>
    <div class="relative w-64 h-64">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        x="25%"
      />
      <md2-progress :value="100" :max="300" type="circular"/>
    </div>
    <div class="relative w-64 h-64">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        :coordinator="[50, 50, 0, 0]"
      />
      <md2-progress :visible="visible" type="circular" indeterminate="type2" inverse/>
    </div>
    <div class="relative w-64 h-64">
      <md2-image
        value="#ff0000"
        :hide="hide"
        :disabled="disabled"
      />
    </div>
    <div class="relative w-64 h-64">
      <md2-image
        value="@test"
        :hide="hide"
        :disabled="disabled"
      />
      <md2-ripple/>
      <md2-progress :visible="visible" indeterminate="type2"/>
    </div>
  </div>
  <div>
    <button @click="onClick">test</button>
    <div>
      <input type="checkbox" name="hide" v-model="hide"> hide
    </div>
    <div>
      <input type="checkbox" name="disabled" v-model="disabled"> disabled
    </div>
    <div>
      <input type="checkbox" name="visible" v-model="visible"> visible
    </div>
  </div>
  <div class="flex items-center gap-2">
    <md2-icon :icon="{value: 'close', disabled: true}" :active="active" :turn="turn" :background="background"
              :hide="hide"
              animation-show :disabled="disabled"/>
    <md2-icon :icon="icon" icon-active="face" size="md" :active="active" :turn="turn" :background="background"
              :hide="hide" :animation-show="animationShow" :disabled="disabled"/>
    <md2-icon icon="close" size="lg" :active="active" :turn="turn" :background="background" :hide="hide"
              animation-type="type2" :animation-show="animationShow" :disabled="disabled"/>
    <md2-icon icon="close" size="xl" :active="active" :turn="turn" :background="background" :hide="hide"
              animation-type="type2" :animation-show="animationShow" :disabled="disabled"/>
    test
  </div>
  <div>
    <div>
      <input type="checkbox" name="active" v-model="active"> active
    </div>
    <div>
      <input type="checkbox" name="turn" v-model="turn"> turn
    </div>
    <div>
      <input type="checkbox" name="background" v-model="background"> background
    </div>
    <div>
      <input type="checkbox" name="animationShow" v-model="animationShow"> animationShow
    </div>
    <button @click="onClickIcon">test 2</button>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-window>
      <template v-slot:control="binds">
        <md2-button text="window" :class="binds.classes" v-on="binds.on"/>
      </template>
    </md2-window>
  </div>
  <div class="flex items-center gap-2 py-12 pl-8">
    <md2-scrollbar border style="height: 400px">
      В лицейский период Пушкин написал много стихотворных произведений. Его вдохновляли французские поэты XVII—XVIII
      веков, с творчеством которых он познакомился в детстве, читая книги из библиотеки отца. Любимые поэты и писатели
      молодого Пушкина перечислены в стихотворении «Городок» (1815 г.): Вольтер, Гомер, Вергилий, Т. Тассо, Лафонтен,
      Дмитриев, Крылов, Державин, Вержье, Грекур, Парни, Расин, Мольер, Фонвизин, Княжнин, Озеров, Руссо, Карамзин,
      Лагарп[19]. В его ранней лирике соединились традиции французского и русского классицизма. Учителями Пушкина-поэта
      стали Батюшков, признанный мастер «лёгкой поэзии», и Жуковский, глава отечественного романтизма. Пушкинская лирика
      периода 1813—1815 годов пронизана мотивами быстротечности жизни, которая диктовала жажду наслаждения радостями
      бытия. С 1816 года, вслед за Жуковским, он обращается к элегиям, где развивает характерные для этого жанра мотивы:
      неразделённой любви, ухода молодости, угасания души. Лирика Пушкина ещё подражательна, полна литературных
      условностей и штампов, тем не менее уже тогда начинающий поэт выбирает свой, особый путь[20]. Не замыкаясь на
      поэзии камерной, Пушкин обращался к темам более сложным, общественно значимым. «Воспоминания в Царском Селе»
      (1814), заслужившие одобрение Державина, — в начале 1815 года Пушкин читал стихотворение в его присутствии, —
      посвящено событиям Отечественной войны 1812 года[21]. Стихотворение было опубликовано в 1815 году в журнале
      «Российский музеум» за полной подписью автора. А в пушкинском послании «Лицинию» критически изображена современная
      жизнь России, где в образе «любимца деспота» выведен Аракчеев. Уже в начале своего творческого пути Пушкин
      проявлял интерес к русским писателям-сатирикам прошлого века. Влияние Фонвизина чувствуется в сатирической поэме
      Пушкина «Тень Фонвизина» (1815)[22]; с творчеством Радищева связаны «Бова» (1814) и «Безверие» (1817)[23].

      <div class="py-6">
        <b>Молодость</b>
      </div>

      Свидетельство, выданное Пушкину по окончании лицея
      Из лицея Пушкин был выпущен 9 июня 1817 года в чине коллежского секретаря (10-го класса, по Табели о рангах)[28],
      13 июня высочайшим указом был определён в Коллегию иностранных дел и 15 июня принёс присягу, подписав бланк
      клятвенного обещания императору[29].

      В это время отец передал Александру своего дворового крепостного Никиту, знавшего Сашу с первых дней, ставшего ему
      настоящим другом и прошедшего с ним практически весь жизненный путь вплоть до последнего дня, кроме года
      Михайловской ссылки[30].

      Пушкин становится постоянным посетителем театра, принимает участие в заседаниях «Арзамаса» (принят он был туда
      заочно, ещё учеником Лицея, и получил кличку «Сверчок»)[31], в 1819 году вступает в литературно-театральное
      общество «Зелёная лампа», которым руководит «Союз благоденствия» (см. Декабристы)[32].

      Пушкин на лицейском экзамене. Картина И. Репина (1911)
      Не участвуя в деятельности первых тайных организаций, Пушкин тем не менее связан дружескими узами со многими
      активными членами декабристских обществ, пишет политические эпиграммы и стихи «К Чаадаеву» («Любви, надежды, тихой
      славы…», 1818), «Вольность» (1818), «Н. Я. Плюсковой» (1818), «Деревня» (1819), распространявшиеся в списках.

      В эти годы Пушкин работает над поэмой «Руслан и Людмила», начатой в Лицее и отвечавшей программным установкам
      литературного общества «Арзамас» о необходимости создания национальной богатырской поэмы. Поэма опубликована в мае
      1820 года (по спискам была известна ранее) и вызвала различные, не всегда благожелательные, отклики. Уже после
      высылки Пушкина вокруг поэмы разгорелись споры[33]. Некоторые критики были возмущены снижением высокого канона.
      Смешение в «Руслане и Людмиле» русско-французских приёмов словесного выражения с просторечием и фольклорной
      стилистикой вызвало упрёки и со стороны защитников демократической народности в литературе. Такие нарекания
      содержало письмо Д. Зыкова, литературного последователя Катенина, опубликованное в «Сыне отечества»[34][35].
    </md2-scrollbar>
    <div class="h-4"></div>
    <md2-scrollbar border inverse style="height: 400px">
      В лицейский период Пушкин написал много стихотворных произведений. Его вдохновляли французские поэты XVII—XVIII
      веков, с творчеством которых он познакомился в детстве, читая книги из библиотеки отца. Любимые поэты и писатели
      молодого Пушкина перечислены в стихотворении «Городок» (1815 г.): Вольтер, Гомер, Вергилий, Т. Тассо, Лафонтен,
      Дмитриев, Крылов, Державин, Вержье, Грекур, Парни, Расин, Мольер, Фонвизин, Княжнин, Озеров, Руссо, Карамзин,
      Лагарп[19]. В его ранней лирике соединились традиции французского и русского классицизма. Учителями Пушкина-поэта
      стали Батюшков, признанный мастер «лёгкой поэзии», и Жуковский, глава отечественного романтизма. Пушкинская лирика
      периода 1813—1815 годов пронизана мотивами быстротечности жизни, которая диктовала жажду наслаждения радостями
      бытия. С 1816 года, вслед за Жуковским, он обращается к элегиям, где развивает характерные для этого жанра мотивы:
      неразделённой любви, ухода молодости, угасания души. Лирика Пушкина ещё подражательна, полна литературных
      условностей и штампов, тем не менее уже тогда начинающий поэт выбирает свой, особый путь[20]. Не замыкаясь на
      поэзии камерной, Пушкин обращался к темам более сложным, общественно значимым. «Воспоминания в Царском Селе»
      (1814), заслужившие одобрение Державина, — в начале 1815 года Пушкин читал стихотворение в его присутствии, —
      посвящено событиям Отечественной войны 1812 года[21]. Стихотворение было опубликовано в 1815 году в журнале
      «Российский музеум» за полной подписью автора. А в пушкинском послании «Лицинию» критически изображена современная
      жизнь России, где в образе «любимца деспота» выведен Аракчеев. Уже в начале своего творческого пути Пушкин
      проявлял интерес к русским писателям-сатирикам прошлого века. Влияние Фонвизина чувствуется в сатирической поэме
      Пушкина «Тень Фонвизина» (1815)[22]; с творчеством Радищева связаны «Бова» (1814) и «Безверие» (1817)[23].

      <div class="py-6">
        <b>Молодость</b>
      </div>

      Свидетельство, выданное Пушкину по окончании лицея
      Из лицея Пушкин был выпущен 9 июня 1817 года в чине коллежского секретаря (10-го класса, по Табели о рангах)[28],
      13 июня высочайшим указом был определён в Коллегию иностранных дел и 15 июня принёс присягу, подписав бланк
      клятвенного обещания императору[29].

      В это время отец передал Александру своего дворового крепостного Никиту, знавшего Сашу с первых дней, ставшего ему
      настоящим другом и прошедшего с ним практически весь жизненный путь вплоть до последнего дня, кроме года
      Михайловской ссылки[30].

      Пушкин становится постоянным посетителем театра, принимает участие в заседаниях «Арзамаса» (принят он был туда
      заочно, ещё учеником Лицея, и получил кличку «Сверчок»)[31], в 1819 году вступает в литературно-театральное
      общество «Зелёная лампа», которым руководит «Союз благоденствия» (см. Декабристы)[32].

      Пушкин на лицейском экзамене. Картина И. Репина (1911)
      Не участвуя в деятельности первых тайных организаций, Пушкин тем не менее связан дружескими узами со многими
      активными членами декабристских обществ, пишет политические эпиграммы и стихи «К Чаадаеву» («Любви, надежды, тихой
      славы…», 1818), «Вольность» (1818), «Н. Я. Плюсковой» (1818), «Деревня» (1819), распространявшиеся в списках.

      В эти годы Пушкин работает над поэмой «Руслан и Людмила», начатой в Лицее и отвечавшей программным установкам
      литературного общества «Арзамас» о необходимости создания национальной богатырской поэмы. Поэма опубликована в мае
      1820 года (по спискам была известна ранее) и вызвала различные, не всегда благожелательные, отклики. Уже после
      высылки Пушкина вокруг поэмы разгорелись споры[33]. Некоторые критики были возмущены снижением высокого канона.
      Смешение в «Руслане и Людмиле» русско-французских приёмов словесного выражения с просторечием и фольклорной
      стилистикой вызвало упрёки и со стороны защитников демократической народности в литературе. Такие нарекания
      содержало письмо Д. Зыкова, литературного последователя Катенина, опубликованное в «Сыне отечества»[34][35].
    </md2-scrollbar>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-fab :progress="visible" height="sm" icon="face"/>
    <md2-fab :progress="visible" height="sm" text="text"/>
    <md2-fab :progress="visible" height="sm" text="text" icon="face"/>
    <md2-fab :progress="visible" height="sm" text="lowercase" icon="face" :lowercase="true"/>
    <md2-fab :progress="visible" height="sm" text="ellipsis" icon="face" :ellipsis="false"/>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-fab :progress="visible" height="md" icon="face"/>
    <md2-fab :progress="visible" height="md" text="text"/>
    <md2-fab :progress="visible" height="md" text="text" icon="face"/>
    <md2-fab :progress="visible" height="md" text="lowercase" icon="face" :lowercase="true"/>
    <md2-fab :progress="visible" height="md" text="ellipsis" icon="face" :ellipsis="false"/>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-fab :progress="visible" height="lg" icon="face"/>
    <md2-fab :progress="visible" height="lg" text="text"/>
    <md2-fab :progress="visible" height="lg" text="text" icon="face"/>
    <md2-fab :progress="visible" height="lg" text="lowercase" icon="face" :lowercase="true"/>
    <md2-fab :progress="visible" height="lg" text="ellipsis" icon="face" :ellipsis="false"/>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-fab :progress="visible" disabled icon="face"/>
    <md2-fab :progress="visible" disabled text="text"/>
    <md2-fab :progress="visible" disabled text="text" icon="face"/>
    <md2-fab :progress="visible" disabled text="lowercase" icon="face" :lowercase="true"/>
    <md2-fab :progress="visible" disabled text="ellipsis" icon="face" :ellipsis="false"/>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-fab :progress="visible" adaptive="sm" text="sm" icon="face"/>
    <md2-fab :progress="visible" adaptive="md" text="md" icon="face"/>
    <md2-fab :progress="visible" adaptive="lg" text="lg" icon="face"/>
    <md2-fab :progress="visible" adaptive="full" text="full" icon="face"/>
    <md2-fab :progress="visible" adaptive="icon" text="icon" icon="face"/>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-fab :progress="visible" rounded="none" text="none" icon="face"/>
    <md2-fab :progress="visible" rounded="standard" text="standard" icon="face"/>
    <md2-fab :progress="visible" rounded="sm" text="sm" icon="face"/>
    <md2-fab :progress="visible" rounded="md" text="md" icon="face"/>
    <md2-fab :progress="visible" rounded="lg" text="lg" icon="face"/>
    <md2-fab :progress="visible" rounded="full" text="full" icon="face"/>
    <md2-fab :progress="visible" rounded="full" text="full" icon="face" :ripple="false"/>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-chip
      text="chip"
      icon="face"
      :turn="turn"
      :progress="visible"
    />
    <md2-chip
      text="chip"
      icon-trailing="close"
      :turn="turn"
      :progress="visible"
    />
    <md2-chip
      text="chip"
      icon="face"
      icon-trailing="close"
      :turn="turn"
      :progress="visible"
    />
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-chip
      text="chip"
      icon="face"
      icon-trailing="close"
      :turn="turn"
      :progress="visible"
    />
    <md2-chip text="red" palette="red" :disabled="disabled" :progress="visible"/>
    <md2-chip text="green" palette="green"/>
    <md2-chip text="green" palette="green" selected/>
    <md2-chip text="dragged" dragged/>
    <md2-chip text="readonly" readonly/>
    <md2-chip text="selected" selected/>
    <md2-chip text="selected+disabled" selected disabled/>
    <md2-chip text="disabled" disabled/>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-chip
      text="chip"
      icon="face"
      icon-trailing="close"
      :turn="turn"
      :progress="visible"
      appearance="outlined"
    />
    <md2-chip text="red" appearance="outlined" palette="red" :disabled="disabled" :progress="visible"/>
    <md2-chip text="green" appearance="outlined" palette="green"/>
    <md2-chip text="green" appearance="outlined" palette="green" selected/>
    <md2-chip text="dragged" appearance="outlined" dragged/>
    <md2-chip text="readonly" appearance="outlined" readonly/>
    <md2-chip text="selected" appearance="outlined" selected/>
    <md2-chip text="selected+disabled" appearance="outlined" selected disabled/>
    <md2-chip text="disabled" appearance="outlined" disabled/>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-chip
      text="none"
      icon="face"
      icon-trailing="close"
      :turn="turn"
      :progress="visible"
      rounded="none"
    />
    <md2-chip
      text="standard"
      icon="face"
      icon-trailing="close"
      :turn="turn"
      :progress="visible"
      rounded="standard"
    />
    <md2-chip
      text="sm"
      icon="face"
      icon-trailing="close"
      :turn="turn"
      :progress="visible"
      rounded="sm"
    />
    <md2-chip
      text="md"
      icon="face"
      icon-trailing="close"
      :turn="turn"
      :progress="visible"
      rounded="md"
    />
    <md2-chip
      text="full"
      icon="face"
      icon-trailing="close"
      :turn="turn"
      :progress="visible"
      rounded="full"
    />
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-chip text="sm" icon="face" height="sm" :progress="visible" :hide="hide"/>
    <md2-chip text="md" icon="face" height="md" :progress="visible" :hide="hide"/>
    <md2-chip text="lg" icon="face" height="lg" :progress="visible" :hide="hide"/>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-chip text="sm" height="sm" :progress="visible"/>
    <md2-chip dense text="sm" height="sm" :progress="visible"/>
    <md2-chip dense text="sm" icon="face" height="sm" :progress="visible"/>
    <md2-chip dense text="md" icon="face" height="md" :progress="visible"/>
    <md2-chip dense text="lg" icon="face" height="lg" :progress="visible"/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-chip text="auto" width="auto"/>
    <md2-chip text="sm" width="sm"/>
    <md2-chip text="md" width="md"/>
    <md2-chip text="lg" width="lg"/>
    <md2-chip text="200px" width="200px"/>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-button
      text="button"
      :progress="visible"
      :disabled="disabled"
      icon-trailing="close"
      @onClick="onEmit"
      @onTrailing="onEmit"
      :detail="{name:'name',value:'value'}"
      value="test"
    />
    <md2-button>slot</md2-button>
    <md2-button text="red" palette="red" :disabled="disabled" :progress="visible"/>
    <md2-button text="green" palette="green" :progress="visible"/>
    <md2-button text="dragged" dragged/>
    <md2-button text="readonly" readonly/>
    <md2-button text="selected" selected/>
    <md2-button text="selected+disabled" selected disabled/>
    <md2-button text="disabled" disabled/>
  </div>
  <div class="flex items-center gap-2 pt-8 pl-8">
    <md2-button text="link" tag="a"/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button appearance="outlined" :disabled="disabled" text="button"/>
    <md2-button appearance="outlined">slot</md2-button>
    <md2-button appearance="outlined" text="red" palette="red" :progress="visible"/>
    <md2-button appearance="outlined" text="green" palette="green" :progress="visible"/>
    <md2-button appearance="outlined" text="dragged" dragged/>
    <md2-button appearance="outlined" text="readonly" readonly/>
    <md2-button appearance="outlined" text="selected" selected/>
    <md2-button appearance="outlined" text="selected+disabled" selected disabled/>
    <md2-button appearance="outlined" text="disabled" disabled/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button appearance="text" :disabled="disabled" text="button"/>
    <md2-button appearance="text">slot</md2-button>
    <md2-button appearance="text" text="red" palette="red"/>
    <md2-button appearance="text" text="green" palette="green"/>
    <md2-button appearance="text" text="dragged" dragged/>
    <md2-button appearance="text" text="readonly" readonly/>
    <md2-button appearance="text" text="selected" selected/>
    <md2-button appearance="text" text="selected+disabled" selected disabled/>
    <md2-button appearance="text" text="disabled" disabled/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button icon="close" :progress="visible" :disabled="disabled"/>
    <md2-button icon="close" :progress="visible">text</md2-button>
    <md2-button text="icon" icon="close"/>
    <md2-button text="icon+iconActive" :disabled="disabled" :progress="visible" :icon="{icon:'close',iconActive:'face'}"
                selected/>
    <md2-button>
      <md2-icon icon="face"/>
      slot+icon
      <md2-icon icon="close" in-end/>
    </md2-button>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button icon="close" :progress="visible" height="sm"/>
    <md2-button icon="face" :progress="visible" height="md"/>
    <md2-button icon="close" :progress="visible" height="lg"/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button appearance="text" icon="close" :progress="visible"/>
    <md2-button appearance="text" icon="close" :progress="visible">text</md2-button>
    <md2-button appearance="text" text="icon" icon="close"/>
    <md2-button appearance="text" text="icon+iconActive" :progress="visible" :icon="{icon:'close',iconActive:'face'}"
                selected/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button text="icon+icon-trailing" :progress="visible" icon="face" icon-trailing="close"/>
    <md2-button icon="face" icon-trailing="close"/>
    <md2-button text="icon-trailing" icon-trailing="close"/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button appearance="text" text="icon+icon-trailing" :progress="visible" icon="face" icon-trailing="close"/>
    <md2-button appearance="text" icon="face" icon-trailing="close"/>
    <md2-button appearance="text" text="icon-trailing" icon-trailing="close"/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button text="lowercase" lowercase/>
    <md2-button text="lowercase+disabled" lowercase disabled/>
    <md2-button text="ellipsis" :ellipsis="false"/>
    <md2-button text="dense" dense/>
    <md2-button text="ripple" :ripple="false"/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button text="sm" height="sm"/>
    <md2-button text="md" height="md"/>
    <md2-button text="lg" height="lg"/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button text="l" align="left" width="lg"/>
    <md2-button text="r" align="right" width="lg"/>
    <md2-button text="c" align="center" width="lg"/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button text="standard" rounded="standard"/>
    <md2-button text="none" rounded="none"/>
    <md2-button text="sm" rounded="sm"/>
    <md2-button text="md" rounded="md"/>
    <md2-button text="lg" rounded="lg"/>
    <md2-button text="xl" rounded="xl"/>
    <md2-button text="full" rounded="full"/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button text="full" adaptive="full"/>
    <md2-button text="sm" adaptive="sm"/>
    <md2-button text="md" adaptive="md"/>
    <md2-button text="lg" adaptive="lg"/>
    <md2-button text="icon" adaptive="icon"/>
    <md2-button text="icon" adaptive="icon" dense/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button text="full" icon="face" adaptive="full"/>
    <md2-button text="sm" icon="face" adaptive="sm"/>
    <md2-button text="md" icon="face" adaptive="md"/>
    <md2-button text="lg" icon="face" adaptive="lg"/>
    <md2-button text="icon" icon="face" adaptive="icon"/>
    <md2-button text="icon" icon="face" adaptive="icon" dense/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-chip text="full" icon="face" adaptive="full"/>
    <md2-chip text="sm" icon="face" adaptive="sm"/>
    <md2-chip text="md" icon="face" adaptive="md"/>
    <md2-chip text="lg" icon="face" adaptive="lg"/>
    <md2-chip text="icon" icon="face" adaptive="icon"/>
    <md2-chip text="icon" icon="face" adaptive="icon" dense/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button text="full" icon="face" icon-trailing="close" adaptive="full" :turn="turn"/>
    <md2-button text="sm" icon="face" icon-trailing="close" adaptive="sm" :turn="turn"/>
    <md2-button text="md" icon="face" icon-trailing="close" adaptive="md" :turn="turn"/>
    <md2-button text="lg" icon="face" icon-trailing="close" adaptive="lg" :turn="turn"/>
    <md2-button text="icon" icon="face" icon-trailing="close" adaptive="icon" :turn="turn"/>
    <md2-button text="icon" icon="face" icon-trailing="close" adaptive="icon" dense :turn="turn"/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button
      icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      adaptive="full" :turn="turn" rounded="full" height="sm"/>
    <md2-button
      icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      adaptive="full" :turn="turn" rounded="full" height="md"/>
    <md2-button
      icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      adaptive="full" :turn="turn" rounded="full" height="lg"/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button
      icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      adaptive="full" :turn="turn" rounded="full" height="sm"/>
    <md2-button
      icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      icon-trailing="close" adaptive="full" :turn="turn" rounded="full" height="sm"/>
    <md2-button text="full"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                icon-trailing="close" adaptive="full" :turn="turn" rounded="full" height="sm"/>
    <md2-button text="full"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                icon-trailing="close" adaptive="full" :turn="turn" rounded="full" height="md"/>
    <md2-button text="full"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                icon-trailing="close" adaptive="full" :turn="turn" rounded="full" height="lg" disabled/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button appearance="text"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                adaptive="full" :turn="turn" rounded="full" height="sm"/>
    <md2-button appearance="text"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                icon-trailing="close" adaptive="full" :turn="turn" rounded="full" height="sm"/>
    <md2-button appearance="text" text="full"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                icon-trailing="close" adaptive="full" :turn="turn" rounded="full" height="sm"/>
    <md2-button appearance="text" text="full"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                icon-trailing="close" adaptive="full" :turn="turn" rounded="full" height="md"/>
    <md2-button appearance="text" text="full"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                icon-trailing="close" adaptive="full" :turn="turn" rounded="full" height="lg" disabled/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button appearance="outlined"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                adaptive="full" :turn="turn" rounded="full" height="sm"/>
    <md2-button appearance="outlined"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                icon-trailing="close" adaptive="full" :turn="turn" rounded="full" height="sm"/>
    <md2-button appearance="outlined" text="full"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                icon-trailing="close" adaptive="full" :turn="turn" rounded="full" height="sm"/>
    <md2-button appearance="outlined" text="full"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                icon-trailing="close" adaptive="full" :turn="turn" rounded="full" height="md"/>
    <md2-button appearance="outlined" text="full"
                icon="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
                icon-trailing="close" adaptive="full" :turn="turn" rounded="full" height="lg" disabled/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button appearance="text" icon="close" adaptive="full" :turn="turn"
                rounded="full" height="sm" disabled/>
    <md2-button appearance="text" icon="close" icon-trailing="close" adaptive="full" :turn="turn"
                rounded="full" height="sm" disabled/>
    <md2-button appearance="text" text="full" icon="close" icon-trailing="close" adaptive="full" :turn="turn"
                rounded="full" height="sm" disabled/>
    <md2-button appearance="contained" text="full" icon="close" icon-trailing="close" adaptive="full" :turn="turn"
                rounded="full" height="md" disabled/>
    <md2-button appearance="outlined" text="full" icon="close" icon-trailing="close" adaptive="full" :turn="turn"
                rounded="full" height="lg" disabled/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button text="auto" width="auto"/>
    <md2-button text="sm" width="sm"/>
    <md2-button text="md" width="md"/>
    <md2-button text="lg" width="lg"/>
    <md2-button text="200px" width="200px"/>
  </div>
  <div class="flex items-center gap-2 pt-4 pl-8">
    <md2-button text="full" width="full"/>
  </div>
  <div style="height: 100px"/>
  <div class="home flex flex-wrap">
    <div class="relative w-64 h-64">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        adaptive
        :object-width="500"
        :object-height="500"
      />
    </div>
    <div class="relative w-64 h-64">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        adaptive
        :object-width="1000"
        :object-height="500"
      />
    </div>
    <div class="relative w-64 h-64">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        adaptive
        :object-width="500"
        :object-height="1000"
      />
    </div>
    <div class="relative w-64 h-64">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        adaptive
        :object-width="1000"
        :object-height="1000"
      />
    </div>
    <div class="relative w-96 h-96">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        adaptive
        :object-width="1000"
        :object-height="1000"
      />
    </div>
  </div>
  <div style="height: 800px"/>
  <div class="home flex flex-wrap">
    <div class="relative w-64 h-64">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        adaptive
        :object-width="1500"
        :object-height="1500"
      />
    </div>
    <div class="relative w-64 h-64">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        adaptive
        :object-width="2000"
        :object-height="1500"
      />
    </div>
    <div class="relative w-64 h-64">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        adaptive
        :object-width="1500"
        :object-height="2000"
      />
    </div>
    <div class="relative w-64 h-64">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        adaptive
        :object-width="2000"
        :object-height="2000"
      />
    </div>
    <div class="relative w-96 h-96">
      <md2-image
        value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
        :hide="hide"
        :disabled="disabled"
        adaptive
        :object-width="2000"
        :object-height="2000"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import Md2Image from '../../md2/Md2Image/index.vue'
import { Icon } from '../../constructors/Image/Icon'
import Md2Ripple from '../../md2/Md2Ripple/index.vue'
import Md2Progress from '../../md2/Md2Progress/index.vue'
import Md2Icon from '../../md2/Md2Icon/index.vue'
import Md2Button from '../../md2/Md2Button/index.vue'
import { AssociativeType } from '../../constructors/types'
import Md2Chip from '../../md2/Md2Chip/index.vue'
import Md2Fab from '../../md2/Md2Fab/index.vue'
import Md2Window from '../../md2/Md2Window/index.vue'
import Md2Scrollbar from '../../md2/Md2Scrollbar/index.vue'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const file = require('../assets/icons/arrow-left.svg')

Icon.add('test', file)

export default defineComponent({
  name: 'HomeView',
  components: {
    Md2Scrollbar,
    Md2Window,
    Md2Fab,
    Md2Chip,
    Md2Button,
    Md2Icon,
    Md2Progress,
    Md2Ripple,
    Md2Image
  },
  setup () {
    const data = ref('close')
    const icon = ref('close') as Ref<string | AssociativeType>
    return {
      data,
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
      icon,
      hide: ref(),
      disabled: ref(),
      visible: ref(false),
      active: ref(false),
      turn: ref(),
      background: ref(),
      animationShow: ref()
    }
  }
})
</script>

<style/>
