import { useContext, Fragment } from 'react';

import AppContext from '../../context/AppContext';
import { BLOCKY_TYPE } from '@/shared';
import { ImageCropper, BlockyControl, FieldControl } from '../../components';
import { CvoInput, CvoRangeInput } from '../../elements';
import { CommonElement } from './styled';

const StandardPage = () => {
  const { profileData, builders } = useContext(AppContext);

  const blocky = {};
  // objective
  blocky[BLOCKY_TYPE.objective] = (
    <div className="objective blocky">
      <CommonElement className="icon-append-common" builders={builders}>
        <div className="icon">
          <i className="far fa-user"></i>
        </div>
        <CvoInput
          name="objective_headline"
          className="headline"
          value={profileData.objective_headline}
          placeholder="Tiêu đề mục chính"
        />
      </CommonElement>
      <div className="content">
        <CvoInput
          name="objective_content"
          value={profileData.objective_content}
          placeholder="Mục tiêu nghề nghiệp của bạn"
          multiline
        />
      </div>

      {/* block controls */}
      <div className="blocky-controls">
        <BlockyControl keyType={BLOCKY_TYPE.objective} />
      </div>
    </div>
  );

  // education
  blocky[BLOCKY_TYPE.education] = (
    <div className="education blocky">
      <CommonElement className="icon-append-common" builders={builders}>
        <div className="icon">
          <i className="fas fa-graduation-cap"></i>
        </div>
        <CvoInput
          name="education_headline"
          className="headline"
          value={profileData.education_headline}
          placeholder="Tiêu đề mục chính"
        />
      </CommonElement>
      <div className="content">
        {profileData.educations &&
          profileData.educations.map((item, index) => (
            <div className="row-section" key={index}>
              <div className="left-section">
                <div className="name">
                  <CvoInput
                    name={`educations.${index}.school`}
                    value={item.school}
                    placeholder="Tên trường học"
                  />
                </div>
                <div className="period">
                  <CvoInput
                    name={`educations.${index}.period`}
                    value={item.period}
                    placeholder="Khoảng thời gian học tập"
                  />
                </div>
              </div>
              <div className="right-section">
                <div className="name">
                  <CvoInput
                    name={`educations.${index}.major`}
                    value={item.major}
                    placeholder="Ngành học / Môn học"
                  />
                </div>
                <div className="detail">
                  <CvoInput
                    name={`educations.${index}.detail`}
                    value={item.detail}
                    placeholder="Mô tả chi tiết"
                    multiline
                  />
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="controls">
                <FieldControl objectKey="educations" fieldIndex={index} />
              </div>
            </div>
          ))}
      </div>

      {/* block controls */}
      <div className="blocky-controls">
        <BlockyControl keyType={BLOCKY_TYPE.education} />
      </div>
    </div>
  );

  // experience
  blocky[BLOCKY_TYPE.experience] = (
    <div className="experience blocky">
      <CommonElement className="icon-append-common" builders={builders}>
        <div className="icon">
          <i className="fas fa-briefcase"></i>
        </div>
        <CvoInput
          name="experience_headline"
          className="headline"
          value={profileData.experience_headline}
          placeholder="Tiêu đề mục chính"
        />
      </CommonElement>
      <div className="content">
        {profileData.experiences &&
          profileData.experiences.map((item, index) => (
            <div className="row-section" key={index}>
              <div className="left-section">
                <div className="name">
                  <CvoInput
                    name={`experiences.${index}.company`}
                    value={item.company}
                    placeholder="Tên công ty"
                  />
                </div>
                <div className="period">
                  <CvoInput
                    name={`experiences.${index}.period`}
                    value={item.period}
                    placeholder="Khoảng thời gian làm việc"
                  />
                </div>
              </div>
              <div className="right-section">
                <div className="name">
                  <CvoInput
                    name={`experiences.${index}.position`}
                    value={item.position}
                    placeholder="Vị trí công việc"
                  />
                </div>
                <div className="detail">
                  <CvoInput
                    name={`experiences.${index}.detail`}
                    value={item.detail}
                    placeholder="Mô tả chi tiết công việc"
                    multiline
                  />
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="controls">
                <FieldControl objectKey="experiences" fieldIndex={index} />
              </div>
            </div>
          ))}
      </div>

      {/* block controls */}
      <div className="blocky-controls">
        <BlockyControl keyType={BLOCKY_TYPE.experience} />
      </div>
    </div>
  );

  // activity
  blocky[BLOCKY_TYPE.activity] = (
    <div className="activity blocky">
      <CommonElement className="icon-append-common" builders={builders}>
        <div className="icon">
          <i className="fas fa-users"></i>
        </div>
        <CvoInput
          name="activity_headline"
          className="headline"
          value={profileData.activity_headline}
          placeholder="Tiêu đề mục chính"
        />
      </CommonElement>
      <div className="content">
        {profileData.activities &&
          profileData.activities.map((item, index) => (
            <div className="row-section" key={index}>
              <div className="left first">
                <div className="a-name">
                  <CvoInput
                    name={`activities.${index}.name`}
                    value={item.name}
                    placeholder="Tên tổ chức"
                  />
                </div>
              </div>
              <div className="right second">
                <div className="a-period">
                  <CvoInput
                    name={`activities.${index}.period`}
                    value={item.period}
                    placeholder="Khoảng thời gian"
                  />
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="a-position">
                <CvoInput
                  name={`activities.${index}.position`}
                  value={item.position}
                  placeholder="Vị trí tham gia"
                />
              </div>
              <div className="a-detail">
                <CvoInput
                  name={`activities.${index}.detail`}
                  value={item.detail}
                  placeholder="Mô tả chi tiết hoạt động đã tham gia"
                  multiline
                />
              </div>
              <div className="controls">
                <FieldControl objectKey="activities" fieldIndex={index} />
              </div>
            </div>
          ))}
      </div>

      {/* block controls */}
      <div className="blocky-controls">
        <BlockyControl keyType={BLOCKY_TYPE.activity} />
      </div>
    </div>
  );

  // skill
  blocky[BLOCKY_TYPE.skill] = (
    <div className="skill blocky">
      <CommonElement className="icon-append-common" builders={builders}>
        <div className="icon">
          <i className="fas fa-cube"></i>
        </div>
        <CvoInput
          name="skill_headline"
          className="headline"
          value={profileData.skill_headline}
          placeholder="Tiêu đề mục chính"
        />
      </CommonElement>
      <div className="content">
        {profileData.skills &&
          profileData.skills.map((item, index) => (
            <div className="row-section" key={index}>
              <div className="left name">
                <CvoInput
                  name={`skills.${index}.name`}
                  value={item.name}
                  placeholder="Tên kỹ năng"
                />
              </div>
              <div className="right rate">
                <CvoRangeInput name={`skills.${index}.rate`} value={item.rate} />
              </div>
              <div className="clearfix"></div>
              <div className="controls">
                <FieldControl objectKey="skills" fieldIndex={index} />
              </div>
            </div>
          ))}
      </div>

      {/* block controls */}
      <div className="blocky-controls">
        <BlockyControl keyType={BLOCKY_TYPE.skill} />
      </div>
    </div>
  );

  // other
  blocky[BLOCKY_TYPE.other] = (
    <div className="other blocky">
      <CommonElement className="icon-append-common" builders={builders}>
        <div className="icon">
          <i className="fas fa-info-circle"></i>
        </div>
        <CvoInput
          name="other_headline"
          className="headline"
          value={profileData.other_headline}
          placeholder="Tiêu đề mục chính"
        />
      </CommonElement>
      <div className="content">
        <CvoInput
          name="other_content"
          value={profileData.other_content}
          placeholder="Thông tin bổ sung"
          multiline
        />
      </div>

      {/* block controls */}
      <div className="blocky-controls">
        <BlockyControl keyType={BLOCKY_TYPE.other} />
      </div>
    </div>
  );

  return (
    <div className="cv-standard-page">
      {/* body */}
      <div id="cv-body">
        <div className="general-info">
          <div className="avatar">
            <ImageCropper name="avatar" imagePreviewWidth={124} />
          </div>
          <div className="information">
            <div className="fullname">
              <CvoInput
                name="fullname"
                className="fullname-input"
                value={profileData.fullname}
                placeholder="Họ và tên"
              />
            </div>
            <div className="position">
              <CvoInput
                name="apply_position"
                className="apply-position-input"
                value={profileData.apply_position}
                placeholder="Vị trí ứng tuyển"
              />
            </div>
            <div className="additional">
              <CommonElement className="icon-input" builders={builders}>
                <i className="fas fa-phone-alt"></i>
              </CommonElement>
              <CvoInput
                name="phone_number"
                className="phone-number-input"
                value={profileData.phone_number}
                placeholder="Số điện thoại"
              />

              <CommonElement className="icon-input" builders={builders}>
                <i className="far fa-envelope"></i>
              </CommonElement>
              <CvoInput
                name="email"
                className="email-input"
                value={profileData.email}
                placeholder="Đia chỉ email"
              />

              <CommonElement className="icon-input" builders={builders}>
                <i className="far fa-calendar-alt"></i>
              </CommonElement>
              <CvoInput
                name="birthday"
                className="birthday-input"
                value={profileData.birthday}
                placeholder="Ngày sinh"
              />
            </div>
            <div className="additional-more">
              <CommonElement className="icon-input" builders={builders}>
                <i className="fas fa-map-marker-alt"></i>
              </CommonElement>
              <CvoInput
                name="address"
                className="address-input"
                value={profileData.address}
                placeholder="Địa chỉ"
              />

              <CommonElement className="icon-input" builders={builders}>
                <i className="fas fa-globe"></i>
              </CommonElement>
              <CvoInput
                name="website"
                className="website-input"
                value={profileData.website}
                placeholder="Website"
              />
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
        <div className="content-container">
          {builders.blocky_order.map((item, index) => (
            <Fragment key={index}>{blocky[item]}</Fragment>
          ))}
        </div>
      </div>

      {/* watermark */}
      <div id="watermark">© youth.com.vn</div>
    </div>
  );
};

export default StandardPage;
