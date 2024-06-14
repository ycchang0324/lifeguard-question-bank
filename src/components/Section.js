import React, { useState } from 'react';
import Dropdown from './Dropdown';
import PropTypes from 'prop-types';

function Section({ onChapterSelect, onSectionSelect }) {
  const chapters = ['第一章『救生安全知識』', '第二章『徒手救援知識』', '第三章『急救知識』', '第四章『救援器材知識』','第五章『船艇救援知識』'];
  const sections =  [
    ["救生概論", "水域安全", "仰漂", "踩水", "抽筋自解", "水域標誌"],
    ["速度游", "救生四式", "拖帶假人", "蛙鞋", "潛水", "潛泳", "綜合（入水、接近、防衛躲避、解脫、帶人、起岸…等）"],
    ["CPR&AED(單雙人)", "脊椎損傷(水中救援)", "異物哽塞(含復甦姿勢)", "其他 評估 、 休克 、 止血 、 體循環 、 失溫 、 燙傷 、 骨折 、 冰敷 …等"],
    ["拋繩救生", "長背板", "救生浮標"],
    ["機動船艇", "充氣式船艇", "一般船艇(七人式、橡皮艇)"]
  ];

  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  function findElementIndex(matrix, element) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === element) {
          return j;
        }
      }
    }
    return null;
  }


  const handleChapterSelect = (chapter) => {
    const chapterIndex = chapters.indexOf(chapter);
    setSelectedChapter(chapterIndex);
    setSelectedSection(null);  // 重置小节选择
    onChapterSelect(chapterIndex);  // 传递给父组件
  };

  const handleSectionSelect = (section) => {
    const sectionIndex = findElementIndex(sections, section);
    setSelectedSection(sectionIndex);
    onSectionSelect(sectionIndex);  // 传递给父组件
  };

  return (
    <div className="Section">
      <header className="Section-header">
        <Dropdown title="請選擇章節" items={chapters} onSelect={handleChapterSelect} /> <br/>
        {selectedChapter !== null && (
          <Dropdown title="請選擇小節" items={sections[selectedChapter]} onSelect={handleSectionSelect} />
        )}
      </header>
    </div>
  );
}

Section.propTypes = {
  onChapterSelect: PropTypes.func.isRequired,
  onSectionSelect: PropTypes.func.isRequired,
};

export default Section;
