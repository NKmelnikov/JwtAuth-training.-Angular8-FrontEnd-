import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services-recovery',
  templateUrl: './services-recovery.component.html',
  styleUrls: ['./services-recovery.component.scss']
})
export class ServicesRecoveryComponent implements OnInit {

  constructor() { }

  coatingList = [
    {
      name: 'Покрытие TiN',
      imgPath: 'assets/img/recovery/coating1.png',
      spec: 'Макс. температура применения:<strong> < 600°C</strong>' + '<br>' +
        'Цвет:<strong> золотисто-жёлтый</strong>' + '<br>' +
        'Структура:<strong> однослойная</strong>' + '<br>' +
        'Твёрдость:<strong> 2300 HV0,05</strong>',
      description: 'Внедрённое фирмой Гюринг ещё в начале 80-х годов покрытие TiN находит применение в процессах сверления как недорогое, покрывающее широкий спектр инструмента из быстрорежущей стали и твёрдого сплава.',
    },
    {
      name: 'Покрытие FIRE/nanoFIRE',
      imgPath: 'assets/img/recovery/coating2.png',
      spec: 'Макс. температура применения:<strong> < 800°C</strong>' + '<br>' +
        'Цвет: <strong>фиолетовый</strong>' + '<br>' +
        'Структура: <strong>многослойная</strong>' + '<br>' +
        'Твёрдость: <strong>3300 HV0,05</strong>',
      description: 'Покрытия FIRE и nanoFIRE наряду с титаном и азотом содержат также алюминий. Эти покрытия были внедрены уже в конце 90-х годов и представляют собой дальнейшую разработку покрытий TiN. Они отличаются более высокой твёрдостью, а также хорошей термохимической стойкостью и пригодны как для быстрорежущей стали, так и для твёрдого сплава.',
    },
    {
      name: 'Покрытие TiAlN',
      imgPath: 'assets/img/recovery/coating3.png',
      spec: 'Макс. температура применения:<strong> < 800°C</strong>' + '<br>' +
        'Цвет:<strong> фиолетовый</strong>' + '<br>' +
        'Структура:<strong> однослойная</strong>' + '<br>' +
        'Твёрдость:<strong> 3300 HV0,05</strong>',
      description: 'Покрытие TiAlN имеет аналогичные свойства как у FIRE и nanoFIRE и благодаря своей однослойной структуре часто находит применение в диапазоне мелких свёрл.',
    },
    {
      name: 'Покрытие Signum',
      imgPath: 'assets/img/recovery/coating4.png',
      spec: 'Макс. температура применения:<strong> < 800°C</strong>' + '<br>' +
        'Цвет:<strong> бронзовый</strong>' + '<br>' +
        'Структура:<strong> многослойный нанокомпозит</strong>' + '<br>' +
        'Твёрдость:<strong>  5500 HV0,05</strong>',
      description: 'Signum относят к группе, так называемых, нанокомпозитов. Микроструктура отличается очень мелкими нанокристаллами TiAlN, которые включены в стекловидную, устойчивую к высоким температурам матрицу нитрида кремния. Благодаря этому возникает высокая твёрдость, которая выводит Signum на первое место, особенно по обработке закалённых сталей и литейных материалов.',
    },
    {
      name: 'Покрытие Endurum',
      imgPath: 'assets/img/recovery/coating5.png',
      spec: 'Макс. температура применения:<strong> < 800°C</strong>' + '<br>' +
        'Цвет:<strong> медный</strong>' + '<br>' +
        'Структура:<strong> многослойный нанокомпозит</strong>' + '<br>' +
        'Твёрдость:<strong> 4000 HV0,05</strong>',
      description: 'Endurum, также покрытие из семейства нанокомпозитов, оно было целенаправленно разработано для обработки углеродистых, автоматных и легированных магнием сталей.',
    },
  ];

  ngOnInit(): void {
  }
}
