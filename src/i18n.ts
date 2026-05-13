import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  vi: {
    translation: {
      nav: {
        logo: "PLANTRIPGO",
        home: "TRANG CHỦ",
        saved: "BỘ SƯU TẬP",
        concierge: "TRỢ LÝ",
        settings: "CÀI ĐẶT"
      },
      generalError: "HỆ THỐNG GẶP SỰ CỐ KHI KHỞI TẠO HÀNH TRÌNH. QUÝ KHÁCH VUI LÒNG THỬ LẠI SAU.",
      landing: {
        title: "THIẾT KẾ HÀNH TRÌNH ĐỘC BẢN",
        subtitle: "KIẾN TẠO TRẢI NGHIỆM ĐẲNG CẤP THÔNG QUA LĂNG KÍNH TRÍ TUỆ NHÂN TẠO.",
        getStarted: "BẮT ĐẦU KHỞI HÀNH",
        explore: "KHÁM PHÁ KHO LƯU TRỮ",
        badge: "PLANTRIPGO - NƠI MỌI HÀNH TRÌNH ĐƯỢC BẮT ĐẦU ĐÚNG CÁCH",
        titleMain: "THIẾT KẾ HÀNH TRÌNH ĐÁNG NHỚ",
        description: "Khám phá thế giới theo cách của riêng bạn với những hành trình được thiết kế dành riêng cho phong cách và cảm hứng cá nhân. mọi trải nghiệm đều được kiến tạo tinh tế để chuyến đi trở nên đáng nhớ hơn.",
        plan: "LẬP KẾ HOẠCH",
        gallery: "BỘ SƯU TẬP",
        heritage: "DI SẢN",
        minimal: "TỐI GIẢN",
        retreatTitle: "KỲ NGHỈ HỘI AN",
        retreatDesc: "HÀNH TRÌNH 4 NGÀY ĐƯỢC THIẾT KẾ RIÊNG TẠI TRUNG TÂM DI SẢN VIỆT NAM.",
        authLabel: "CHỨNG THỰC",
        authValue: "TUYẾN ĐƯỜNG UY TÍN",
        feature1Title: "TUYỂN CHỌN TINH TẾ",
        feature1Desc: "Hệ thống tự động lựa chọn các điểm đến hội tụ đủ vẻ đẹp thẩm mỹ và chiều sâu văn hóa.",
        feature2Title: "LỘ TRÌNH TỐI ƯU",
        feature2Desc: "Sắp xếp lộ trình thông minh nhằm giảm thiểu mệt mỏi và tối ưu hóa thời gian trải nghiệm.",
        feature3Title: "LƯU VÀ CHIA SẺ",
        feature3Desc: "Tải xuống lịch trình với trình bày chuyên nghiệp, sẵn sàng cho việc lưu giữ hoặc chia sẻ."
      },
      setup: {
        exit: "THOÁT QUY TRÌNH",
        steps: {
          1: "ĐIỂM ĐẾN",
          2: "NGƯỜI ĐỒNG HÀNH",
          3: "SỞ THÍCH TRẢI NGHIỆM",
          4: "NGÂN SÁCH"
        },
        step1: {
          title: "ĐIỂM ĐẾN",
          subtitle: "\"MỌI HÀNH TRÌNH VĨ ĐẠI ĐỀU BẮT ĐẦU TỪ MỘT ĐÍCH ĐẾN.\"",
          label: "ĐIỂM ĐẾN MONG MUỐN",
          placeholder: "VÍ DỤ: TOKYO, NHẬT BẢN HOẶC HỘI AN, VIỆT NAM",
          daysLabel: "THỜI GIAN LƯU TRÚ (NGÀY)"
        },
        step2: {
          title: "NGƯỜI ĐỒNG HÀNH",
          subtitle: "SẮC THÁI CỦA CHUYẾN ĐI ĐƯỢC ĐỊNH HÌNH BỞI NHỮNG NGƯỜI ĐỒNG HÀNH.",
          solo: "DU KHÁCH ĐỘC HÀNH",
          couple: "CẶP ĐÔI",
          family: "GIA ĐÌNH",
          friends: "NHÓM BẠN"
        },
        step3: {
          title: "SỞ THÍCH TRẢI NGHIỆM",
          subtitle: "LỰA CHỌN CÁC SỞ THÍCH CHO VIỆC BIÊN SOẠN",
          interests: {
            culture: "VĂN HÓA & LỊCH SỬ",
            nature: "THIÊN NHIÊN",
            food: "ẨM THỰC TINH HOA",
            adventure: "TRẢI NGHIỆM ĐỘT PHÁ",
            shopping: "MUA SẮM CAO CẤP",
            nightlife: "GIẢI TRÍ SÔI ĐỘNG",
            art: "NGHỆ THUẬT & SÁNG TẠO",
            relaxation: "NGHỈ DƯỠNG & TÁI TẠO"
          }
        },
        step4: {
          title: "NGÂN SÁCH",
          subtitle: "XÁC ĐỊNH MỨC ĐỘ NGÂN SÁCH CHO KÌ NGHỈ CỦA BẠN",
          budget: {
            modest: { 
              label: "TIẾT KIỆM", 
              desc: "Hành trình linh hoạt, tập trung vào trải nghiệm cốt lõi." 
            },
            balanced: { 
              label: "CÂN BẰNG", 
              desc: "Trải nghiệm kết hợp giữa sự thoải mái và giá trị." 
            },
            luxury: { 
              label: "SANG TRỌNG", 
              desc: "Tiện nghi thượng lưu và dịch vụ cao cấp nhất." 
            }
          }
        },
        back: "TRỞ LẠI",
        advance: "TIẾP TỤC",
        finish: "KHỞI TẠO HÀNH TRÌNH"
      },
      loading: {
        progress: "ĐANG THIẾT LẬP HÀNH TRÌNH...",
        engine: "PLANTRIPGO ARTISAN ENGINE · ĐANG SỐ HÓA GIÁ TRỊ DI SẢN",
        steps: [
          "ĐỊNH VỊ TỌA ĐỘ ĐỊA LÝ...",
          "PHÂN TÍCH BỐI CẢNH VĂN HÓA...",
          "TỐI ƯU HÓA SƠ ĐỒ DI CHUYỂN...",
          "KIẾN TẠO TRẢI NGHIỆM CẢM XÚC..."
        ],
        heritage: "HỆ THỐNG TRÍ TUỆ ĐẲNG CẤP"
      },
      itinerary: {
        archive: "HỒ SƠ HÀNH TRÌNH",
        duration: "THỜI GIAN",
        style: "PHONG CÁCH",
        provision: "NGÂN SÁCH",
        totalEstimatedCost: "TỔNG CHI PHÍ ƯỚC TÍNH",
        reset: "LÀM MỚI",
        timeline: "LỊCH TRÌNH CHUYẾN ĐI",
        mapHeader: "BẢN ĐỒ HÀNH TRÌNH",
        progressHeader: "TIẾN ĐỘ CHUYẾN ĐI",
        dayXofY: "NGÀY {{current}} / {{total}}",
        setStartDate: "CHỌN NGÀY KHỞI HÀNH",
        tripActive: "ĐANG DIỄN RA",
        tripFinished: "ĐÃ KẾT THÚC",
        tripUpcoming: "SẮP DIỄN RA",
        bookingHeader: "THÔNG TIN ĐẶT CHỖ",
        validated: "TUYẾN ĐƯỜNG ĐÃ XÁC THỰC",
        time: "THỜI GIAN",
        insights: "GÓC NHÌN CHUYÊN GIA",
        insightText: "HÀNH TRÌNH ĐƯỢC TỐI ƯU DỰA TRÊN GIÁ TRỊ VĂN HÓA VÀ SỰ THOẢI MÁI TUYỆT ĐỐI TRONG DI CHUYỂN.",
        atmosphere: "KHÍ HẬU",
        clear: "TRỜI QUANG MÂY TẠNH",
        spatial: "CHỈ SỐ TRẢI NGHIỆM",
        spatialDesc: "TỔNG QUAN KHÔNG GIAN CHUYẾN ĐI",
        spatialIndex: "VỊ TRÍ",
        atlas: "MỞ BẢN ĐỒ",
        immersive: "TRẢI NGHIỆM 360° ĐỘC BẢN",
        calibrating: "ĐANG HIỆU CHUẨN LĂNG KÍNH...",
        noArchive: "HIỆN CHƯA CÓ KHO ẢNH TƯ LIỆU CHO KHU VỰC NÀY.",
        apiConfigError: "LỖI TRUY CẬP DỮ LIỆU. QUÝ KHÁCH VUI LÒNG KIỂM TRA LẠI CẤU HÌNH HỆ THỐNG.",
        alerts: "THÔNG TIN ĐỊA PHƯƠNG",
        stays: "GỢI Ý LƯU TRÚ",
        staysDesc: "LỰA CHỌN CÁC KHÔNG GIAN NGHỈ DƯỠNG DI SẢN VÀ CÁC ĐIỂM ĐẾN TINH HOA.",
        search: "TÌM KIẾM HÀNH TRÌNH",
        consult: "TƯ VẤN TRÍ TUỆ NHÂN TẠO",
        curationNote: "GHI CHÚ",
        localIntelligence: "LƯU Ý ĐIỂM ĐẾN",
        changeDates: "ĐỔI NGÀY",
        ratingLabel: "ĐÁNH GIÁ",
        avgSpend: "CHI TIÊU TRUNG BÌNH",
        estimatedSavings: "KHOẢN TIẾT KIỆM DỰ KIẾN",
        smartOptimization: "TỐI ƯU HÓA THÔNG MINH",
        costBreakdown: "PHÂN TÍCH CHI PHÍ",
        itemizedExpenses: "CHI TIẾT CÁC KHOẢN CHI",
        transportMode: "PHƯƠNG TIỆN ĐỀ XUẤT",
        travelTime: "THỜI GIAN DI CHUYỂN",
        transportModes: {
            plane: "MÁY BAY",
            car: "Ô TÔ CÁ NHÂN",
            bus: "XE KHÁCH",
            limousine: "LIMOUSINE",
            train: "TÀU HỎA",
            motorbike: "XE MÁY"
        },
        budgetInsightTitle: "NHẬN ĐỊNH NGÂN SÁCH THÔNG MINH",
        budgetInsightDesc: "AI ĐÃ PHÂN TÍCH {{days}} NGÀY HOẠT ĐỘNG TẠI {{destination}} ĐỂ TỐI ƯU HÓA CÁC CHI PHÍ NÀY.",
        replanBudget: "CẬP NHẬT NGÂN SÁCH",
        editBudgetHint: "CẬP NHẬT NGÂN SÁCH ĐỂ AI TỐI ƯU HÓA...",
        optimizeFurther: "TỐI ƯU HÓA THÊM",
        ofTotal: "TỔNG CHI PHÍ",
        mode: "CHẾ ĐỘ",
        estimated: "DỰ TÍNH",
        estimatedLabel: "ƯỚC TÍNH",
        actualSpent: "THỰC CHI",
        points: "ĐIỂM ĐẾN",
        day: "NGÀY",
        days: "NGÀY",
        activityName: "TÊN HOẠT ĐỘNG",
        activityDescription: "MÔ TẢ HOẠT ĐỘNG",
        saveCuration: "LƯU HÀNH TRÌNH",
        processing: "ĐANG XỬ LÝ...",
        success: "THÀNH CÔNG",
        securingSelection: "ĐANG BẢO MẬT LỰA CHỌN...",
        secureVerification: "CHỨNG THỰC BẢO MẬT",
        guests_one: "KHÁCH",
        guests_other: "KHÁCH",
        guest_suffix: "NGƯỜI",
        callNow: "GỌI NGAY",
        bookNow: "ĐẶT NGAY",
        placeholder_name: "HỌ VÀ TÊN CỦA BẠN",
        placeholder_phone: "VÍ DỤ: 0912 345 678",
        placeholder_email: "EXAMPLE@DOMAIN.COM",
        placeholder_address: "VÍ DỤ: 123 ĐƯỜNG LÊ LỢI, QUẬN 1, TP.HCM",
        placeholder_guests: "VÍ DỤ: 2 NGƯỜI",
        location_placeholder: "THÊM CHI TIẾT ĐỊA ĐIỂM...",
        getDirections: "CHỈ ĐƯỜNG",
        activityPoint: "ĐIỂM ĐẾN",
        interactiveGuide: "HƯỚNG DẪN TƯƠNG TÁC",
        recenterMap: "CĂN GIỮA BẢN ĐỒ",
        mappingCuration: "ĐANG CHUẨN BỊ BẢN ĐỒ...",
        selectedPoints: "ĐIỂM ĐÃ CHỌN",
        externalLinks: "DỊCH VỤ & ĐẶT CHỖ",
        bookingFlights: "CHI PHÍ DI CHUYỂN",
        bookingHotels: "LƯU TRÚ & KHÁCH SẠN",
        bookingActivities: "TRẢI NGHIỆM & GIẢI TRÍ",
        bookingDining: "ẨM THỰC & NHÀ HÀNG",
        bookingTransport: "DI CHUYỂN NỘI ĐỊA",
        contingency: "DỰ PHÒNG PHÁT SINH",
        saveToFav: "LƯU VÀO ƯA THÍCH",
        removeFromFav: "GỠ KHỎI ƯA THÍCH",
        author: "NGƯỜI TẠO",
        created: "NGÀY TẠO",
        lastModified: "CẬP NHẬT CUỐI",
        bookingModalHeader: "YÊU CẦU ĐẶT CHỖ",
        bookingModalSub: "VUI LÒNG CUNG CẤP THÔNG TIN CHI TIẾT ĐỂ CHÚNG TÔI CÓ THỂ XÁC NHẬN HÀNH TRÌNH CỦA BẠN.",
        bookingName: "HỌ VÀ TÊN",
        bookingPhone: "SỐ ĐIỆN THOẠI",
        bookingEmail: "ĐỊA CHỈ EMAIL",
        bookingAddress: "ĐỊA CHỈ",
        bookingNotes: "GHI CHÚ THÊM",
        guestErrorPositive: "SỐ LƯỢNG KHÁCH PHẢI LỚN HƠN 0",
        guestErrorLimit: "TỐI ĐA 50 KHÁCH CHO MỖI LƯỢT ĐẶT",
        bookingGuests: "SỐ LƯỢNG KHÁCH",
        bookingConfirm: "XÁC NHẬN ĐẶT CHỖ",
        bookingSuccessTitle: "GỬI YÊU CẦU THÀNH CÔNG!",
        bookingSuccessMsg: "YÊU CẦU ĐẶT CHỖ CỦA BẠN ĐÃ ĐƯỢC GHI NHẬN. CHÚNG TÔI SẼ LIÊN HỆ LẠI SỚM NHẤT.",
        bookingDesc: "CHÚNG TÔI SẼ LIÊN HỆ VỚI BẠN SỚM NHẤT ĐỂ XÁC NHẬN DỊCH VỤ.",
        bookingClose: "ĐÓNG",
        bookingDemoNote: "DỮ LIỆU ĐƯỢC BẢO MẬT BỞI HỆ THỐNG AI",
        tourDetails: {
          title: "CHI TIẾT HÀNH TRÌNH",
          price: "GIÁ TOUR THAM KHẢO",
          perGuest: "KHÁCH",
          includes: "BAO GỒM",
          excludes: "KHÔNG BAO GỒM",
          insurance: "BẢO HIỂM DU LỊCH",
          notes: "LƯU Ý QUAN TRỌNG",
          coverage: "MỨC BỒI THƯỜNG",
          benefits: "QUYỀN LỢI NỔI BẬT"
        },
        travelInsights: {
          title: "NHẬN ĐỊNH DU LỊCH",
          warnings: "LƯU Ý AN TOÀN",
          tips: "MẸO VẶT HỮU ÍCH"
        },
        travelAlerts: {
          title: "CẢNH BÁO HÀNH TRÌNH",
          weather: "THỜI TIẾT",
          risks: "RỦI RO TIỀM ẨN",
          scams: "CẢNH GIÁC LỪA ĐẢO"
        },
        savedTitle: "BỘ SƯU TẬP CỦA BẠN",
        savedSub: "NHỮNG HÀNH TRÌNH ĐƯỢC TINH TUYỂN DÀNH RIÊNG CHO QUÝ KHÁCH.",
        savedEmpty: "CHƯA CÓ HÀNH TRÌNH NÀO",
        savedEmptySub: "KHÁM PHÁ CÁC ĐIỂM ĐẾN TUYỆT VỜI VÀ LƯU HÀNH TRÌNH BẠN YÊU THÍCH.",
        savedStart: "BẮT ĐẦU NGAY",
        savedBack: "QUAY LẠI",
        savedView: "XEM CHI TIẾT",
        savedBtn: "LƯU LỊCH TRÌNH",
        savedBtnActive: "ĐÃ LƯU",
        downloadBtn: "TẢI XUỐNG",
        export: "TẢI LÊN HỒ SƠ"
      },
      chatbot: {
        title: "TRỢ LÝ PLANTRIPGO",
        welcome: "XIN CHÀO! TÔI LÀ TRỢ LÝ PLANTRIPGO. TÔI CÓ THỂ GIÚP GÌ CHO BẠN?",
        placeholder: "NHẬP CÂU HỎI CỦA BẠN...",
        send: "GỬI",
        typing: "ĐANG TRẢ LỜI...",
        faq1: "PLANTRIPGO LÀ GÌ?",
        faq2: "LÀM THẾ NÀO ĐỂ LƯU LỊCH TRÌNH?",
        faq3: "CHI PHÍ ƯỚC TÍNH CÓ CHÍNH XÁC KHÔNG?",
        clearChat: "XÓA CUỘC TRÒ CHUYỆN",
        fallback: "XIN LỖI, TÔI KHÔNG TÌM THẤY THÔNG TIN NÀY. BẠN CÓ THỂ LIÊN HỆ EMAIL: SUPPORT@PLANTRIPGO.COM"
      },
      general: {
        back: "QUAY VỀ",
        next: "TIẾP THEO",
        save: "LƯU"
      }
    }
  },
  en: {
    translation: {
      nav: {
        logo: "PLANTRIPGO",
        home: "HOME",
        saved: "SAVED"
      },
      generalError: "FAILED TO GENERATE ITINERARY. PLEASE TRY AGAIN.",
      landing: {
        title: "ARTISAN TRAVEL CURATION",
        subtitle: "EXPLORE THE WORLD THROUGH THE LENS OF ARTIFICIAL INTELLIGENCE AND DIGITAL HERITAGE.",
        getStarted: "COMMENCE JOURNEY",
        explore: "EXPLORE ARCHIVE",
        badge: "BESPOKE JOURNEYS CRAFTED BY AI",
        titleMain: "CRAFT YOUR\nARTISAN\nESCAPE.",
        description: "ELEGANTLY DESIGNED TRAVEL ROUTES CRAFTED FOR THE SOPHISTICATED EXPLORER. FROM HERITAGE-RICH STAYS TO MINIMAL RETREATS.",
        plan: "PLAN JOURNEY",
        gallery: "VIEW GALLERY",
        heritage: "HERITAGE",
        minimal: "MINIMAL",
        retreatTitle: "HỘI AN RETREAT",
        retreatDesc: "A 4-DAY CURATED EXPERIENCE IN THE HEART OF VIETNAM.",
        authLabel: "AUTHENTICATED",
        authValue: "ROUTE VERIFIED",
        feature1Title: "ARTISAN LOGIC",
        feature1Desc: "OUR ENGINE SELECTS DESTINATIONS THAT BALANCE VISUAL BEAUTY WITH CULTURAL DEPTH.",
        feature2Title: "MINIMAL TRANSIT",
        feature2Desc: "INTELLIGENTLY SEQUENCED STOPS TO MINIMIZE FATIGUE AND ENVIRONMENTAL IMPACT.",
        feature3Title: "HERITAGE EXPORT",
        feature3Desc: "DOWNLOAD BEAUTIFULLY TYPESET ITINERARIES READY FOR LOCAL PRESERVATION OR SHARING."
      },
      setup: {
        exit: "EXIT DESIGN",
        steps: {
          1: "SPATIAL",
          2: "SOCIETY",
          3: "ARTISAN",
          4: "INVESTMENT"
        },
        step1: {
          title: "SPATIAL CONTEXT",
          subtitle: "\"EVERY GREAT JOURNEY STARTS WITH A DESTINATION.\"",
          label: "DESTINATION ARCHIVE",
          placeholder: "E.G. KYOTO, JAPAN OR HOI AN, VIETNAM",
          daysLabel: "TEMPORAL SCOPE (DAYS)"
        },
        step2: {
          title: "SOCIAL HERITAGE",
          subtitle: "THE AURA OF AN ESCAPE IS DEFINED BY ITS CORE UNIT.",
          solo: "SOLO TRAVELER",
          couple: "COUPLE",
          family: "FAMILY",
          friends: "FRIENDS"
        },
        step3: {
          title: "ARTISAN FOCUS",
          subtitle: "SELECT YOUR CULTURAL PILLARS FOR CURATION.",
          interests: {
            culture: "CULTURE & HISTORY",
            nature: "NATURE",
            food: "FOOD & DINING",
            adventure: "ADVENTURE",
            shopping: "SHOPPING",
            nightlife: "NIGHTLIFE",
            art: "ART & PHOTO",
            relaxation: "RELAXATION"
          }
        },
        step4: {
          title: "INVESTMENT",
          subtitle: "DEFINING THE MAGNITUDE OF YOUR RETREAT.",
          budget: {
            modest: { label: "MODEST", desc: "AUTHENTIC LOCAL STAYS AND HIDDEN STREET FOOD." },
            balanced: { label: "BALANCED", desc: "BOUTIQUE HOTELS AND REFINED LOCAL DINING." },
            luxury: { label: "HERITAGE LUXURY", desc: "ESTATE STAYS AND EXCLUSIVE ARTISAN ENCOUNTERS." }
          }
        },
        back: "ARCHIVE",
        advance: "ADVANCE STEP",
        finish: "COMMENCE CURATION"
      },
      loading: {
        progress: "CURATION IN PROGRESS...",
        engine: "PLANTRIPGO ARTISAN ENGINE · PRESERVING DIGITAL HERITAGE",
        steps: [
          "CALIBRATING SPATIAL COORDINATES...",
          "ANALYZING CULTURAL ARCHETYPES...",
          "SYNTHESIZING OPTIMAL ROUTES...",
          "INTEGRATING SENSORY MOTIFS..."
        ],
        heritage: "PREMIUM INTELLIGENCE"
      },
      itinerary: {
        archive: "ITINERARY ARCHIVE",
        duration: "DURATION",
        style: "STYLE",
        provision: "PROVISION",
        totalEstimatedCost: "TOTAL ESTIMATED COST",
        day: "DAY",
        days: "DAYS",
        downloadBtn: "DOWNLOAD HANDBOOK",
        export: "EXPORT",
        bookNow: "BOOK NOW",
        reset: "RESET",
        timeline: "THE TIMELINE",
        mapHeader: "JOURNEY MAP",
        bookingHeader: "RESERVATIONS",
        bookingFlights: "FIND FLIGHTS",
        bookingHotels: "CURATED STAYS",
        bookingActivities: "LOCAL EXPERIENCES",
        bookingModalHeader: "BOOKING REQUEST",
        bookingModalSub: "PLEASE PROVIDE YOUR DETAILS SO OUR ARTISANS CAN CURATE YOUR JOURNEY.",
        bookingName: "FULL NAME",
        bookingPhone: "PHONE NUMBER",
        bookingEmail: "EMAIL ADDRESS",
        bookingAddress: "ADDRESS",
        bookingNotes: "ADDITIONAL NOTES",
        bookingGuests: "NUMBER OF GUESTS",
        bookingConfirm: "CONFIRM RESERVATION",
        bookingSuccessTitle: "RESERVATION RECEIVED!",
        bookingSuccessMsg: "YOUR BOOKING REQUEST HAS BEEN RECORDED. WE WILL CONTACT YOU SHORTLY.",
        bookingClose: "CLOSE",
        bookingDemoNote: "DATA SECURED WITHIN SECURE ARCHIVES",
        tourDetails: {
          title: "DETAILED TOUR INFORMATION",
          price: "REFERENCE PRICE",
          perGuest: "PER GUEST",
          includes: "TOUR INCLUDES",
          excludes: "TOUR EXCLUDES",
          insurance: "TRAVEL INSURANCE",
          notes: "ITINERARY NOTES",
          coverage: "COVERAGE AMOUNT",
          benefits: "INSURANCE BENEFITS"
        },
        savedTitle: "YOUR COLLECTION",
        savedSub: "CURATED JOURNEYS WAITING FOR YOUR ARRIVAL.",
        savedEmpty: "NO JOURNEYS SAVED YET",
        savedEmptySub: "EXPLORE OUR CURATED DESTINATIONS AND SAVE YOUR FAVORITE ITINERARIES TO FIND THEM HERE LATER.",
        savedStart: "START EXPLORING",
        savedBack: "BACK TO DISCOVERY",
        savedView: "VIEW ITINERARY",
        savedBtn: "SAVE",
        savedBtnActive: "SAVED",
        progressHeader: "TRIP PROGRESS",
        dayXofY: "DAY {{current}} OF {{total}}",
        setStartDate: "SET START DATE",
        tripActive: "ACTIVE",
        tripFinished: "COMPLETED",
        tripUpcoming: "UPCOMING",
        validated: "OPTIMIZED ROUTES ONLY",
        time: "TIME",
        insights: "EXPERT INSIGHT",
        insightText: "\"THE CURATION PRIORITIZES ARTISAN HERITAGE AND MINIMAL SPATIAL FATIGUE.\"",
        atmosphere: "ATMOSPHERE",
        clear: "CLEAR SKIES",
        spatial: "SPATIAL INDEX",
        spatialDesc: "OPTIMIZED ARTISAN ROUTES",
        atlas: "OPEN ATLAS",
        immersive: "360° ARTISAN EXPLORER",
        calibrating: "CALIBRATING SPATIAL LENS...",
        noArchive: "VISUAL ARCHIVES UNAVAILABLE FOR THIS SPATIAL UNIT.",
        apiConfigError: "API ACCESS DENIED. PLEASE ENSURE 'PLACES API (NEW)' IS ENABLED IN YOUR GOOGLE CLOUD CONSOLE.",
        alerts: "LOCAL INTELLIGENCE",
        stays: "ARTISAN STAYS?",
        staysDesc: "RESERVE BESPOKE HERITAGE STAYS AND HAND-PICKED ARTISAN ENCOUNTERS.",
        search: "SEARCH ARCHIVE",
        consult: "CONSULT PLANTRIPGO AI",
        optimized: "OPTIMIZED ROUTE",
        curationNote: "ITINERARY NOTES",
        localIntelligence: "LOCAL INTELLIGENCE",
        changeDates: "CHANGE DATES",
        budgetControl: "BUDGET CONTROL",
        estimated: "ESTIMATED",
        actualSpent: "ACTUAL SPENT",
        points: "POINTS",
        activityName: "ACTIVITY NAME",
        saveCuration: "SAVE CURATION",
        securingSelection: "SECURING SELECTION...",
        secureVerification: "SECURE VERIFICATION",
        guests_one: "GUEST",
        guests_other: "GUESTS",
        placeholder_name: "JOHN DOE",
        placeholder_phone: "+1 234 567 890",
        placeholder_email: "JOHN@DOE.COM",
        location_placeholder: "ADD LOCATION DETAILS...",
        externalLinks: "EXTERNAL ARTISAN LINKS",
        bookingDining: "DINING",
        bookingTransport: "LOCAL TRANSPORT",
        contingency: "CONTINGENCY",
        saveToFav: "SAVE TO FAVORITES",
        removeFromFav: "REMOVE FROM FAVORITES",
        author: "AUTHOR",
        created: "CREATED",
        lastModified: "LAST MODIFIED",
        travelInsights: {
          title: "TRAVEL INSIGHTS",
          warnings: "PRACTICAL WARNINGS",
          tips: "INSIDER TIPS"
        },
        travelAlerts: {
          title: "TRAVEL ALERTS",
          weather: "SEASONAL WEATHER",
          risks: "COMMON RISKS",
          scams: "SCAM ALERTS"
        }
      },
      chatbot: {
        title: "PLANTRIPGO CONCIERGE",
        welcome: "HELLO! I AM YOUR PLANTRIPGO ASSISTANT. HOW MAY I HELP YOU TODAY?",
        placeholder: "TYPE YOUR MESSAGE...",
        send: "SEND",
        typing: "TYPING...",
        faq1: "WHAT IS PLANTRIPGO?",
        faq2: "HOW DO I SAVE MY ITINERARY?",
        faq3: "IS THE ESTIMATED COST ACCURATE?",
        clearChat: "CLEAR CONVERSATION",
        fallback: "I APOLOGIZE, I COULDN'T FIND THAT INFORMATION. PLEASE CONTACT US AT: SUPPORT@PLANTRIPGO.COM"
      }
    }
  },
  ja: {
    translation: {
      nav: {
        logo: "Plantripgo",
        home: "ホーム",
        saved: "保存済み"
      },
      generalError: "日程の生成に失敗しました。もう一度お試しください。",
      landing: {
        title: "職人による旅のキュレーション",
        subtitle: "人工知能とデジタル遺産のレンズを通して世界を探索しましょう。",
        getStarted: "旅を始める",
        explore: "アーカイブを探索",
        badge: "AIによって作成された特注の旅",
        titleMain: "職人による\nエスケープを\n作成する。",
        description: "洗練された探検家のために作られた、エレガントにデザインされた旅行ルート。伝統豊かな滞在からミニマルな隠れ家まで。",
        plan: "旅を計画する",
        gallery: "ギャラリーを見る",
        heritage: "遺産",
        minimal: "ミニマル",
        retreatTitle: "ホイアン・リトリート",
        retreatDesc: "ベトナムの中心部でキュレーションされた4日間の体験。",
        authLabel: "認証済み",
        authValue: "ルート確認済み",
        feature1Title: "アーティザン・ロジック",
        feature1Desc: "当社のエンジンは、視覚的な美しさと文化的な深みのバランスが取れた目的地を選択します。",
        feature2Title: "最小限の移動",
        feature2Desc: "疲労と環境への影響を最小限に抑えるために、インテリジェントに配列されたストップ。",
        feature3Title: "ヘリテージ・エクスポート",
        feature3Desc: "地元の保存や共有に適した、美しく組版された旅程をダウンロードできます。"
      },
      setup: {
        exit: "デザインを終了",
        steps: {
          1: "空間",
          2: "社会",
          3: "職人",
          4: "投資"
        },
        step1: {
          title: "空間的文脈",
          subtitle: "「すべての偉大な旅は目的地から始まります。」",
          label: "目的地アーカイブ",
          placeholder: "例：京都、日本 または ホイアン、ベトナム",
          daysLabel: "時間的範囲（日数）"
        },
        step2: {
          title: "社会的遺産",
          subtitle: "逃避行のオーラは、その核となるユニットによって定義されます。",
          solo: "一人旅",
          couple: "カップル",
          family: "家族",
          friends: "友人"
        },
        step3: {
          title: "職人の視点",
          subtitle: "キュレーションのための文化的柱を選択してください。",
          interests: {
            culture: "文化と歴史",
            nature: "自然",
            food: "食とダイニング",
            adventure: "冒険",
            shopping: "ショッピング",
            nightlife: "ナイトライフ",
            art: "芸術と写真",
            relaxation: "リラクゼーション"
          }
        },
        step4: {
          title: "投資",
          subtitle: "リトリートの規模を定義します。",
          budget: {
            modest: { label: "控えめ", desc: "本物の地元の滞在と隠れたストリートフード。" },
            balanced: { label: "バランス", desc: "ブティックホテルと洗練された地元の食事。" },
            luxury: { label: "ヘリテージ・ラグジュアリー", desc: "邸宅での滞在と独占的な職人との出会い。" }
          }
        },
        back: "戻る",
        advance: "次へ",
        finish: "キュレーションを開始"
      },
      loading: {
        progress: "キュレーション進行中...",
        engine: "Plantripgo Artisan Engine · デジタル遺産の保存",
        steps: [
          "空間座標を調整中...",
          "文化的原型を分析中...",
          "最適なルートを合成中...",
          "感覚的なモチーフを統合中..."
        ],
        heritage: "プレミアム・インテリジェンス"
      },
      itinerary: {
        archive: "旅程アーカイブ",
        duration: "期間",
        style: "スタイル",
        provision: "準備",
        days: "日",
        export: "書き出し",
        reset: "リセット",
        timeline: "タイムライン",
        validated: "検証済みルートのみ",
        time: "時間",
        insights: "エキスパートの洞察",
        insightText: "「キュレーションは職人の遺産と最小限の空間的疲労を優先しています。」",
        atmosphere: "雰囲気",
        clear: "晴天",
        spatial: "空間指数",
        spatialDesc: "最適化された職人のルート",
        atlas: "アトラスを開く",
        alerts: "現地のインテリジェンス",
        stays: "職人の滞在？",
        staysDesc: "オーダーメイドの伝統的な滞在と厳選された職人との出会いを予約しましょう。",
        search: "アーカイブを検索",
        consult: "Plantripgo AIに相談",
        footer: "E-Tourismコースのための第7グループによるウェブサイト",
        optimized: "最適化されたルート",
        changeDates: "日付を変更",
        budgetControl: "予算管理",
        estimated: "見積もり",
        actualSpent: "実績",
        points: "地点",
        activityName: "アクティビティ名",
        saveCuration: "キュレーションを保存",
        securingSelection: "選択を保護中...",
        secureVerification: "セキュア認証",
        guests_one: "ゲスト",
        guests_other: "ゲスト",
        placeholder_name: "山田 太郎",
        placeholder_phone: "090-0000-0000",
        placeholder_email: "taro@yamada.com",
        location_placeholder: "場所の詳細を追加...",
        savedBtn: "保存",
        savedBtnActive: "保存済み",
        downloadBtn: "ダウンロード",
        travelInsights: {
          title: "旅行の洞察",
          warnings: "実用的な警告",
          tips: "インサイダーのヒント"
        },
        travelAlerts: {
          title: "旅行アラート",
          weather: "季節の天気",
          risks: "一般的なリスク",
          scams: "詐欺の警告"
        }
      },
      chatbot: {
        title: "PLANTRIPGO コンシェルジュ",
        welcome: "こんにちは！PLANTRIPGOアシスタントです。何かお手伝いできることはありますか？",
        placeholder: "メッセージを入力してください...",
        send: "送信",
        typing: "入力中...",
        faq1: "PLANTRIPGOとは何ですか？",
        faq2: "旅程を保存するにはどうすればよいですか？",
        faq3: "見積もり費用は正確ですか？",
        fallback: "申し訳ありません。情報が見つかりませんでした。サポートチーム（SUPPORT@PLANTRIPGO.COM）までお問い合わせください。"
      }
    }
  },
  ko: {
    translation: {
      nav: {
        logo: "Plantripgo",
        home: "홈",
        saved: "저장됨"
      },
      landing: {
        title: "장인 정신이 깃든 여행 큐레이션",
        subtitle: "인공지능과 디지털 유산의 렌즈를 통해 세계를 탐험하세요.",
        getStarted: "여행 시작",
        explore: "아카이브 탐색",
        badge: "AI가 제작한 맞춤형 여정",
        titleMain: "당신만의\n예술적인 도피를\n제작하세요.",
        description: "세련된 탐험가를 위해 우아하게 디자인된 여행 루트입니다. 유산이 풍부한 숙박부터 미니멀한 휴양지까지.",
        plan: "여행 계획",
        gallery: "갤러리 보기",
        heritage: "헤리티지",
        minimal: "미니멀",
        retreatTitle: "호이안 리트릿",
        retreatDesc: "베트남 중심부에서의 4일간의 큐레이션 경험.",
        authLabel: "인증 완료",
        authValue: "경로 확인됨",
        feature1Title: "아티잔 로직",
        feature1Desc: "우리 엔진은 시각적 아름다움과 문화적 깊이의 균형을 맞춘 목적지를 선택합니다.",
        feature2Title: "최소한의 이동",
        feature2Desc: "피로와 환경 영향을 최소화하기 위해 지능적으로 순서가 지정된 경유지.",
        feature3Title: "헤리티지 내보내기",
        feature3Desc: "현지 보존 또는 공유가 가능한 아름답게 조판된 여행 일정을 다운로드하세요."
      },
      setup: {
        exit: "디자인 종료",
        steps: {
          1: "공간",
          2: "사회",
          3: "장인",
          4: "투자"
        },
        step1: {
          title: "공간적 맥락",
          subtitle: "\"모든 위대한 여정은 목적지에서 시작됩니다.\"",
          label: "목적지 아카이브",
          placeholder: "예: 일본 교토 또는 베트남 호이안",
          daysLabel: "시간적 범위 (일수)"
        },
        step2: {
          title: "사회적 유산",
          subtitle: "탈출의 아우라는 그 핵심 단위에 의해 정의됩니다.",
          solo: "나홀로 여행",
          couple: "커플",
          family: "가족",
          friends: "친구"
        },
        step3: {
          title: "장인 정신 집중",
          subtitle: "큐레이션을 위한 문화적 기둥을 선택하세요.",
          interests: {
            culture: "문화 및 역사",
            nature: "자연",
            food: "음식 및 다이닝",
            adventure: "모험",
            shopping: "쇼핑",
            nightlife: "나이트라이프",
            art: "예술 및 사진",
            relaxation: "휴식"
          }
        },
        step4: {
          title: "투자",
          subtitle: "휴양의 규모를 정의합니다.",
          budget: {
            modest: { label: "알뜰", desc: "정통 현지 숙박 및 숨겨진 길거리 음식." },
            balanced: { label: "균형", desc: "부티크 호텔 및 세련된 현지 식사." },
            luxury: { label: "헤리티지 럭셔리", desc: "대저택 숙박 및 독점적인 장인과의 만남." }
          }
        },
        back: "이전",
        advance: "다음",
        finish: "큐레이션 시작"
      },
      loading: {
        progress: "큐레이션 진행 중...",
        engine: "Plantripgo Artisan Engine · 디지털 유산 보존",
        steps: [
          "공간 좌표 보정 중...",
          "문화적 원형 분석 중...",
          "최적의 경로 합성 중...",
          "감각적 모티프 통합 중..."
        ],
        heritage: "프리미엄 인텔리전스"
      },
      itinerary: {
        archive: "여행 일정 아카이브",
        duration: "기간",
        style: "스타일",
        provision: "준비",
        days: "일",
        export: "내보내기",
        reset: "초기화",
        timeline: "타임라인",
        validated: "최적화된 경로 전용",
        time: "시간",
        insights: "전문가 인사이트",
        insightText: "\"큐레이션은 장인 유산과 최소한의 공간적 피로를 우선시합니다.\"",
        atmosphere: "분위기",
        clear: "맑음",
        spatial: "공간 지수",
        spatialDesc: "최적화된 장인 경로",
        atlas: "아틀라스 열기",
        alerts: "현지 인텔리전스",
        stays: "장인 숙소?",
        staysDesc: "맞춤형 유산 숙박 및 엄선된 장인과의 만남을 예약하세요.",
        search: "아카이브 검색",
        consult: "Plantripgo AI 상담",
        footer: "E-Tourism 과정을 위한 7팀의 웹사이트",
        optimized: "최적화된 경로",
        changeDates: "날짜 변경",
        budgetControl: "예산 관리",
        estimated: "예상",
        actualSpent: "실제 지출",
        points: "지점",
        activityName: "활동 이름",
        saveCuration: "큐레이션 저장",
        securingSelection: "선택 보호 중...",
        secureVerification: "보안 인증",
        guests_one: "명",
        guests_other: "명",
        placeholder_name: "김철수",
        placeholder_phone: "010-0000-0000",
        placeholder_email: "chulsoo@kim.com",
        location_placeholder: "장소 세부 정보 추가...",
        savedBtn: "저장",
        savedBtnActive: "저장됨",
        downloadBtn: "일정 다운로드",
        travelInsights: {
          title: "여행 인사이트",
          warnings: "실질적 경고",
          tips: "인사이더 팁"
        },
        travelAlerts: {
          title: "여행 알림",
          weather: "계절별 날씨",
          risks: "일반적인 위험",
          scams: "사기 경고"
        }
      },
      chatbot: {
        title: "PLANTRIPGO 컨시어지",
        welcome: "안녕하세요! PLANTRIPGO 어시스턴트입니다. 무엇을 도와드릴까요?",
        placeholder: "메시지를 입력하세요...",
        send: "전송",
        typing: "답변 중...",
        faq1: "PLANTRIPGO란 무엇인가요?",
        faq2: "일정을 어떻게 저장하나요?",
        faq3: "예상 비용이 정확한가요?",
        fallback: "죄송합니다. 해당 정보를 찾을 수 없습니다. 지원팀에 문의해 주세요: SUPPORT@PLANTRIPGO.COM"
      }
    }
  },
  zh: {
    translation: {
      nav: {
        logo: "Plantripgo",
        home: "首页",
        saved: "已保存"
      },
      landing: {
        title: "匠心旅游策划",
        subtitle: "通过人工智能和数字遗产的镜头探索世界。",
        getStarted: "开始旅程",
        explore: "探索存档",
        badge: "AI 打造的定制之旅",
        titleMain: "打造你的\n匠心\n逃离。",
        description: "为精致的探险家精心设计的旅行路径。从富含文化遗产的下榻处到极简境界的避世所。",
        plan: "策划旅程",
        gallery: "查看画廊",
        heritage: "遗产",
        minimal: "极简",
        retreatTitle: "会安静谧之旅",
        retreatDesc: "在越南中心地带策划的 4 天体验。",
        authLabel: "已验证",
        authValue: "路线认证",
        feature1Title: "匠心逻辑",
        feature1Desc: "我们的引擎选择平衡视觉美感与文化深度的目的地。",
        feature2Title: "极简交通",
        feature2Desc: "智能排列停靠站，以尽量减少疲劳和环境影响。",
        feature3Title: "遗产导出",
        feature3Desc: "下载排版精美的行程，随时可供本地保存或分享。"
      },
      setup: {
        exit: "退出设计",
        steps: {
          1: "空间",
          2: "社交",
          3: "匠心",
          4: "投资"
        },
        step1: {
          title: "空间背景",
          subtitle: "\"每一段伟大的旅程都始于一个目的地。\"",
          label: "目的地存档",
          placeholder: "例如：日本京都 或 越南会安",
          daysLabel: "时间范围（天）"
        },
        step2: {
          title: "社交遗产",
          subtitle: "逃离的氛围由其核心单位定义。",
          solo: "独自旅行",
          couple: "情侣",
          family: "家庭",
          friends: "朋友"
        },
        step3: {
          title: "匠心核心",
          subtitle: "选择您的文化支柱进行策划。",
          interests: {
            culture: "文化与历史",
            nature: "自然",
            food: "美食与餐饮",
            adventure: "冒险",
            shopping: "购物",
            nightlife: "夜生活",
            art: "艺术与摄影",
            relaxation: "休闲"
          }
        },
        step4: {
          title: "投资",
          subtitle: "定义您避世所的规模。",
          budget: {
            modest: { label: "适度", desc: "地道的当地住宿和隐秘的街头美食。" },
            balanced: { label: "均衡", desc: "精品酒店和精致的当地餐饮。" },
            luxury: { label: "遗产奢华", desc: "庄园住宿和专属的匠心邂逅。" }
          }
        },
        back: "存档",
        advance: "下一步",
        finish: "开始策划"
      },
      loading: {
        progress: "策划进行中...",
        engine: "Plantripgo AI 引擎运行中",
        steps: [
          "分析空间背景...",
          "分析文化原型...",
          "合成最优路线...",
          "整合感官母题..."
        ],
        heritage: "高端智能"
      },
      itinerary: {
        archive: "行程存档",
        duration: "时长",
        style: "风格",
        provision: "预算",
        days: "天",
        export: "导出",
        reset: "重置",
        timeline: "时间轴",
        validated: "仅限优化路线",
        day: "天",
        curationNote: "行程注意事项",
        localIntelligence: "当地情报",
        spatialIndex: "空间索引",
        openAtlas: "开启地图",
      },
      chatbot: {
        title: "PLANTRIPGO 智能助手",
        welcome: "您好！我是 PLANTRIPGO 助手。请问有什么可以帮您？",
        placeholder: "输入消息...",
        send: "发送",
        typing: "正在输入...",
        faq1: "什么是 PLANTRIPGO？",
        faq2: "如何保存我的行程？",
        faq3: "预估费用准确吗？",
        fallback: "抱歉，未找到相关信息。请联系：SUPPORT@PLANTRIPGO.COM"
      }
    }
  },
  fr: {
    translation: {
      nav: {
        logo: "Plantripgo",
        home: "Accueil",
        saved: "Enregistré"
      },
      landing: {
        title: "Curation de Voyage Artisanale",
        subtitle: "Explorez le monde à travers le prisme de l'intelligence artificielle et de l'héritage numérique.",
        getStarted: "Commencer le Voyage",
        explore: "Explorer l'Archive",
        badge: "Voyages sur Mesure Conçus par IA",
        titleMain: "CRÉEZ VOTRE\nÉVASION\nARTISANALE.",
        description: "Des itinéraires élégamment conçus pour l'explorateur sophistiqué. Des séjours riches en patrimoine aux retraites minimalistes.",
        plan: "Planifier le Voyage",
        gallery: "Voir la Galerie",
        heritage: "Héritage",
        minimal: "Minimaliste",
        retreatTitle: "Retraite à Hoi An",
        retreatDesc: "Une expérience de 4 jours curatée au cœur du Vietnam.",
        authLabel: "Authentifié",
        authValue: "Route Vérifiée",
        feature1Title: "Logique Artisanale",
        feature1Desc: "Notre moteur sélectionne des destinations qui équilibrent beauté visuelle et profondeur culturelle.",
        feature2Title: "Transit Minimal",
        feature2Desc: "Séquençage intelligent des arrêts pour minimiser la fatigue et l'impact environnemental.",
        feature3Title: "Export Héritage",
        feature3Desc: "Téléchargez des itinéraires magnifiquement mis en page, prêts pour la conservation locale ou le partage."
      },
      setup: {
        exit: "Quitter le Design",
        steps: {
          1: "Spatiale",
          2: "Société",
          3: "Artisan",
          4: "Investissement"
        },
        step1: {
          title: "Contexte Spatial",
          subtitle: "\"Chaque grand voyage commence par une destination.\"",
          label: "Archive des Destinations",
          placeholder: "ex. Kyoto, Japon ou Hoi An, Vietnam",
          daysLabel: "Portée Temporelle (Jours)"
        },
        step2: {
          title: "Héritage Social",
          subtitle: "L'aura d'une évasion est définie par son unité centrale.",
          solo: "Voyageur Solo",
          couple: "Couple",
          family: "Famille",
          friends: "Amis"
        },
        step3: {
          title: "Focus Artisanal",
          subtitle: "Sélectionnez vos piliers culturels pour la curation.",
          interests: {
            culture: "Culture & Histoire",
            nature: "Nature",
            food: "Gastronomie",
            adventure: "Aventure",
            shopping: "Shopping",
            nightlife: "Vie nocturne",
            art: "Art & Photo",
            relaxation: "Détente"
          }
        },
        step4: {
          title: "Investissement",
          subtitle: "Définissez l'ampleur de votre retraite.",
          budget: {
            modest: { label: "Modeste", desc: "Séjours locaux authentiques et cuisine de rue cachée." },
            balanced: { label: "Équilibré", desc: "Hôtels de charme et fine cuisine locale." },
            luxury: { label: "Héritage Luxe", desc: "Séjours en domaine et rencontres artisanales exclusives." }
          }
        },
        back: "Archive",
        advance: "Étape Suivante",
        finish: "Commencer la Curation"
      },
      loading: {
        progress: "Curation en cours...",
        engine: "Moteur Plantripgo Artisan · Préservation du Patrimoine Numérique",
        steps: [
          "Calibrage des coordonnées spatiales...",
          "Analyse des archétypes culturels...",
          "Synthèse des itinéraires optimaux...",
          "Intégration des motifs sensoriels..."
        ],
        heritage: "Intelligence de Luxe"
      },
      itinerary: {
        archive: "Archive d'Itinéraire",
        duration: "Durée",
        style: "Style",
        provision: "Budget",
        days: "Jours",
        export: "Exporter",
        reset: "Réinitialiser",
        timeline: "La Chronologie",
        validated: "Routes Optimisées Uniquement",
        day: "Jour",
        curationNote: "Notes d'itinéraire",
        localIntelligence: "Intelligence locale",
        spatialIndex: "Indice Spatial",
        openAtlas: "Ouvrir l'Atlas",
        consult: "Consulter Plantripgo AI",
        footer: "Site web par le Groupe 7 pour le cours de E-Tourisme",
        optimized: "Itinéraire Optimisé",
        changeDates: "Modifier les Dates",
        budgetControl: "Contrôle du Budget",
        estimated: "Estimé",
        actualSpent: "Dépensé",
        points: "Points",
        activityName: "Nom de l'Activité",
        saveCuration: "Enregistrer la Curation",
        securingSelection: "Sécurisation de la Sélection...",
        secureVerification: "Vérification Sécurisée",
        guests_one: "Invité",
        guests_other: "Invités",
        placeholder_name: "Jean Dupont",
        placeholder_phone: "+33 6 00 00 00 00",
        placeholder_email: "jean.dupont@example.com",
        location_placeholder: "Ajouter des détails sur l'emplacement...",
        savedBtn: "ENREGISTRER",
        savedBtnActive: "ENREGISTRÉ",
        downloadBtn: "TÉLÉCHARGER PDF",
        travelInsights: {
          title: "APERÇUS DE VOYAGE",
          warnings: "AVERTISSEMENTS PRATIQUES",
          tips: "CONSEILS D'EXPERTS"
        },
        travelAlerts: {
          title: "ALERTES DE VOYAGE",
          weather: "MÉTÉO SAISONNIÈRE",
          risks: "RISQUES COURANTS",
          scams: "ALERTES ARNAQUES"
        }
      },
      chatbot: {
        title: "PLANTRIPGO CONCIERGE",
        welcome: "BONJOUR ! JE SUIS VOTRE ASSISTANT PLANTRIPGO. COMMENT PUIS-JE VOUS AIDER ?",
        placeholder: "TAPEZ VOTRE MESSAGE...",
        send: "ENVOYER",
        typing: "RÉPONSE EN COURS...",
        faq1: "QU'EST-CE QUE PLANTRIPGO ?",
        faq2: "COMMENT ENREGISTRER MON ITINÉRAIRE ?",
        faq3: "LE COÛT ESTIMÉ EST-IL PRÉCIS ?",
        fallback: "JE M'EXCUSE, JE N'AI PAS TROUVÉ CETTE INFORMATION. VEUILLEZ NOUS CONTACTER À : SUPPORT@PLANTRIPGO.COM"
      }
    }
  },
  es: {
    translation: {
      nav: {
        logo: "Plantripgo",
        history: "Historial",
        saved: "Guardado"
      },
      landing: {
        title: "Curaduría de Viajes Artesanales",
        subtitle: "Explore el mundo a través del lente de la inteligencia artificial y el patrimonio digital.",
        getStarted: "Comenzar Viaje",
        explore: "Explorar Archivo",
        badge: "Viajes Personalizados Creados por IA",
        titleMain: "DISEÑA TU\nESCAPADA\nARTESANAL.",
        description: "Rutas de viaje elegantemente diseñadas para el explorador sofisticado. Desde estancias ricas en patrimonio hasta retiros minimalistas.",
        plan: "Planificar Viaje",
        gallery: "Ver Galería",
        heritage: "Patrimonio",
        minimal: "Minimalista",
        retreatTitle: "Retiro en Hoi An",
        retreatDesc: "Una experiencia curada de 4 días en el corazón de Vietnam.",
        authLabel: "Autenticado",
        authValue: "Ruta Verificada",
        feature1Title: "Lógica Artesanal",
        feature1Desc: "Nuestro motor selecciona destinos que equilibran belleza visual con profundidad cultural.",
        feature2Title: "Tránsito Mínimo",
        feature2Desc: "Paradas secuenciadas inteligentemente para minimizar la fatiga y el impacto ambiental.",
        feature3Title: "Exportar Patrimonio",
        feature3Desc: "Descarga itinerarios bellamente tipografiados listos para su conservación local o para compartir."
      },
      setup: {
        exit: "Salir del Diseño",
        steps: {
          1: "Espacial",
          2: "Sociedad",
          3: "Artesanal",
          4: "Inversión"
        },
        step1: {
          title: "Contexto Espacial",
          subtitle: "\"Cada gran viaje comienza con un destino.\"",
          label: "Archivo de Destinos",
          placeholder: "ej. Kioto, Japón o Hoi An, Vietnam",
          daysLabel: "Alcance Temporal (Días)"
        },
        step2: {
          title: "Patrimonio Social",
          subtitle: "El aura de una escapada se define por su unidad central.",
          solo: "Viajero Solo",
          couple: "Pareja",
          family: "Familia",
          friends: "Amigos"
        },
        step3: {
          title: "Enfoque Artesanal",
          subtitle: "Seleccione sus pilers culturales para la curaduría.",
          interests: {
            culture: "Cultura e Historia",
            nature: "Naturaleza",
            food: "Gastronomía",
            adventure: "Aventura",
            shopping: "Compras",
            nightlife: "Vida nocturna",
            art: "Arte y Fotografía",
            relaxation: "Relajación"
          }
        },
        step4: {
          title: "Inversión",
          subtitle: "Defina la magnitud de su retiro.",
          budget: {
            modest: { label: "Modesto", desc: "Estancias locales auténticas y comida callejera escondida." },
            balanced: { label: "Equilibrado", desc: "Hoteles boutique y refinada cena local." },
            luxury: { label: "Lujo Patrimonial", desc: "Estancias en fincas y encuentros artesanales exclusivos." }
          }
        },
        back: "Archivo",
        advance: "Siguiente Paso",
        finish: "Comenzar Curaduría"
      },
      loading: {
        progress: "Curaduría en curso...",
        engine: "Motor Plantripgo Artesanal · Preservando el Patrimonio Digital",
        steps: [
          "Calibrando coordenadas espaciales...",
          "Analizando arquetipos culturales...",
          "Sintetizando rutas óptimas...",
          "Integrando motivos sensoriales..."
        ],
        heritage: "Inteligencia Premium"
      },
      itinerary: {
        archive: "Archivo de Itinerarios",
        duration: "Duración",
        style: "Estilo",
        provision: "Presupuesto",
        days: "Días",
        export: "Exportar",
        reset: "Reiniciar",
        timeline: "La Cronología",
        validated: "Solo Rutas Optimizadas",
        day: "Día",
        curationNote: "Notas del itinerario",
        localIntelligence: "Inteligencia local",
        spatialIndex: "Índice Espacial",
        openAtlas: "Abrir Atlas",
        footer: "Sitio web del Grupo 7 para el curso de E-Turismo",
        optimized: "Ruta Optimizada",
        changeDates: "Cambiar Fechas",
        budgetControl: "Control de Presupuesto",
        estimated: "Estimado",
        actualSpent: "Gastado",
        points: "Puntos",
        activityName: "Nombre de la Actividad",
        saveCuration: "Guardar Curaduría",
        securingSelection: "Asegurando Selección...",
        secureVerification: "Verificación Segura",
        guests_one: "Huésped",
        guests_other: "Huéspedes",
        placeholder_name: "Juan Pérez",
        placeholder_phone: "+34 600 000 000",
        placeholder_email: "juan@perez.com",
        location_placeholder: "Añadir detalles de ubicación...",
        savedBtn: "GUARDAR",
        savedBtnActive: "GUARDADO",
        downloadBtn: "DESCARGAR PDF",
        travelInsights: {
          title: "INFORMACIÓN DE VIAJE",
          warnings: "ADVERTENCIAS PRÁCTICAS",
          tips: "CONSEJOS DE EXPERTOS"
        },
        travelAlerts: {
          title: "ALERTAS DE VIAJE",
          weather: "CLIMA ESTACIONAL",
          risks: "RIESGOS COMUNES",
          scams: "ALERTAS DE ESTAFAS"
        }
      },
      chatbot: {
        title: "PLANTRIPGO CONCIERGE",
        welcome: "¡HOLA! SOY TU ASISTENTE PLANTRIPGO. ¿CÓMO PUEDO AYUDARTE HOY?",
        placeholder: "ESCRIBE TU MENSAJE...",
        send: "ENVIAR",
        typing: "ESCRIBIENDO...",
        faq1: "¿QUÉ ES PLANTRIPGO?",
        faq2: "¿CÓMO GUARDO MI ITINERARIO?",
        faq3: "¿EL COSTO ESTIMADO ES EXACTO?",
        fallback: "LO SIENTO, NO PUDE ENCONTRAR ESA INFORMACIÓN. POR FAVOR, CONTÁCTANOS EN: SUPPORT@PLANTRIPGO.COM"
      }
    }
  },
  ru: {
    translation: {
      nav: {
        logo: "Plantripgo",
        history: "История",
        saved: "Сохранено"
      },
      landing: {
        title: "Изысканное Планирование Путешествий",
        subtitle: "Исследуйте мир через призму искусственного интеллекта и цифрового наследия.",
        getStarted: "Начать Путешествие",
        explore: "Открыть Архив",
        badge: "Индивидуальные поездки от ИИ",
        titleMain: "СОЗДАЙТЕ СВОЙ\nИЗЫСКАННЫЙ\nОТДЫХ.",
        description: "Элегантно разработанные маршруты для искушенных исследователей. От исторических особняков до минималистичных ретритов.",
        plan: "Запланировать",
        gallery: "Галерея",
        heritage: "Наследие",
        minimal: "Минимализм",
        retreatTitle: "Ретрит в Хойане",
        retreatDesc: "Кураторский 4-дневный опыт в сердце Вьетнама.",
        authLabel: "Проверено",
        authValue: "Заверенный Маршрут",
        feature1Title: "Мастерская Логика",
        feature1Desc: "Наш движок выбирает направления, сочетающие визуальную эстетику и культурную глубину.",
        feature2Title: "Минимальный Транзит",
        feature2Desc: "Умная последовательность остановок для минимизации усталости и воздействия на среду.",
        feature3Title: "Экспорт Наследия",
        feature3Desc: "Скачивайте красиво оформленные маршруты, готовые для печати или сохранения."
      },
      setup: {
        exit: "Выйти из Дизайна",
        steps: {
          1: "Пространство",
          2: "Общество",
          3: "Мастерство",
          4: "Инвестиции"
        },
        step1: {
          title: "Пространственный Контекст",
          subtitle: "\"Каждое великое путешествие начинается с точки назначения.\"",
          label: "Архив Направлений",
          placeholder: "напр. Киото, Япония или Хойан, Вьетнам",
          daysLabel: "Временной Охват (Дни)"
        },
        step2: {
          title: "Социальное Наследие",
          subtitle: "Аура отдыха определяется его основой.",
          solo: "Один",
          couple: "Пара",
          family: "Семья",
          friends: "Друзья"
        },
        step3: {
          title: "Фокус Мастерства",
          subtitle: "Выберите культурные столпы для кураторства.",
          interests: {
            culture: "Культура и История",
            nature: "Природа",
            food: "Гастрономия",
            adventure: "Приключения",
            shopping: "Шоппинг",
            nightlife: "Ночная жизнь",
            art: "Искусство и Фото",
            relaxation: "Релаксация"
          }
        },
        step4: {
          title: "Инвестиции",
          subtitle: "Определите масштаб вашего ретрита.",
          budget: {
            modest: { label: "Скромный", desc: "Аутентичное жилье и скрытые жемчужины уличной еды." },
            balanced: { label: "Сбалансированный", desc: "Бутик-отели и изысканная местная кухня." },
            luxury: { label: "Люкс Наследие", desc: "Проживание в поместьях и эксклюзивные мастер-классы." }
          }
        },
        back: "Архив",
        advance: "Далее",
        finish: "Начать Кураторство"
      },
      loading: {
        progress: "Кураторство в процессе...",
        engine: "Движок Plantripgo Artisan · Сохранение Цифрового Наследия",
        steps: [
          "Калибровка пространственных координат...",
          "Анализ культурных архетипов...",
          "Синтез оптимальных путей...",
          "Интеграция сенсорных мотивов..."
        ],
        heritage: "Премиальный Интеллект"
      },
      itinerary: {
        archive: "Архив Маршрутов",
        duration: "Длительность",
        style: "Стиль",
        provision: "Бюджет",
        days: "Дни",
        export: "Экспорт",
        reset: "Заново",
        timeline: "Хронология",
        validated: "Только Оптимизированные Пути",
        day: "День",
        curationNote: "Примечания к маршруту",
        localIntelligence: "Местная информация",
        spatialIndex: "Пространственный Индекс",
        openAtlas: "Открыть Атлас",
        footer: "Сайт группы 7 для курса электронного туризма",
        optimized: "Оптимизированный маршрут",
        changeDates: "Изменить даты",
        budgetControl: "Контроль бюджета",
        estimated: "Оценка",
        actualSpent: "Фактически",
        points: "Точки",
        activityName: "Название мероприятия",
        saveCuration: "Сохранить подборку",
        securingSelection: "Защита выбора...",
        secureVerification: "Безопасная проверка",
        guests_one: "Гость",
        guests_other: "Гости",
        placeholder_name: "Иван Иванов",
        placeholder_phone: "+7 900 000 00 00",
        placeholder_email: "ivan@ivanov.ru",
        location_placeholder: "Добавить сведения о местоположении...",
        savedBtn: "СОХРАНИТЬ",
        savedBtnActive: "СОХРАНЕНО",
        downloadBtn: "СКАЧАТЬ PDF",
        travelInsights: {
          title: "ИНФОРМАЦИЯ О ПОЕЗДКЕ",
          warnings: "ПРАКТИЧЕСКИЕ ПРЕДУПРЕЖДЕНИЯ",
          tips: "СОВЕТЫ ЭКСПЕРТОВ"
        },
        travelAlerts: {
          title: "ПРЕДУПРЕЖДЕНИЯ",
          weather: "СЕЗОННАЯ ПОГОДА",
          risks: "ОБЩИЕ РИСКИ",
          scams: "ПРЕДУПРЕЖДЕНИЯ О МОШЕННИЧЕСТВЕ"
        }
      },
      chatbot: {
        title: "PLANTRIPGO КОНСЬЕРЖ",
        welcome: "ЗДРАВСТВУЙТЕ! Я ВАШ ПОМОЩНИК PLANTRIPGO. ЧЕМ Я МОГУ ВАМ ПОМОЧЬ?",
        placeholder: "ВВЕДИТЕ СООБЩЕНИЕ...",
        send: "ОТПРАВИТЬ",
        typing: "ПЕЧАТАЕТ...",
        faq1: "ЧТО ТАКОЕ PLANTRIPGO?",
        faq2: "КАК СОХРАНИТЬ МАРШРУТ?",
        faq3: "НАСКОЛЬКО ТОЧНА ОЦЕНКА СТОИМОСТИ?",
        fallback: "ИЗВИНИТЕ, ИНФОРМАЦИЯ НЕ НАЙДЕНА. СВЯЖИТЕСЬ С НАМИ: SUPPORT@PLANTRIPGO.COM"
      }
    }
  },
  th: {
    translation: {
      nav: {
        logo: "Plantripgo",
        history: "ประวัติการเดินทาง",
        saved: "บันทึกแล้ว"
      },
      landing: {
        title: "การจัดการการเดินทางแบบประณีต",
        subtitle: "สำรวจโลกผ่านมุมมองของปัญญาประดิษฐ์และมรดกทางดิจิทัล",
        getStarted: "เริ่มการเดินทาง",
        explore: "สำรวจคลังข้อมูล",
        badge: "ทริปส่วนตัวที่ออกแบบโดย AI",
        titleMain: "ออกแบบ\nการพักผ่อน\nที่ประณีตของคุณ",
        description: "เส้นทางท่องเที่ยวที่ออกแบบอย่างหรูหราสำหรับนักสำรวจที่ซับซ้อน ตั้งแต่ที่พักที่รุ่มรวยด้วยมรดกทางวัฒนธรรมไปจนถึงที่พักแบบมินิมอล",
        plan: "วางแผนการเดินทาง",
        gallery: "ดูแกลเลอรี",
        heritage: "มรดก",
        minimal: "มินิมอล",
        retreatTitle: "การพักผ่อนในฮอยอัน",
        retreatDesc: "ประสบการณ์ 4 วันที่คัดสรรมาอย่างดีในใจกลางเวียดนาม",
        authLabel: "ได้รับการยืนยันแล้ว",
        authValue: "เส้นทางที่ผ่านการรับรอง",
        feature1Title: "ตรรกะที่ประณีต",
        feature1Desc: "เครื่องยนต์ของเราเลือกจุดหมายปลายทางที่สร้างความสมดุลระหว่างความงามทางสายตาและความลึกซึ้งทางวัฒนธรรม",
        feature2Title: "การเดินทางที่น้อยที่สุด",
        feature2Desc: "การจัดลำดับการหยุดพักอย่างชาญฉลาดเพื่อลดความเหนื่อยล้าและผลกระทบต่อสิ่งแวดล้อม",
        feature3Title: "ส่งออกมรดก",
        feature3Desc: "ดาวน์โหลดแผนการเดินทางที่มีการจัดพิมพ์อย่างสวยงาม พร้อมสำหรับบันทึกหรือแบ่งปัน"
      },
      setup: {
        exit: "ออกจากระบบออกแบบ",
        steps: {
          1: "พื้นที่",
          2: "สังคม",
          3: "งานฝีมือ",
          4: "การลงทุน"
        },
        step1: {
          title: "บริบทของพื้นที่",
          subtitle: "\"ทุกการเดินทางที่ยิ่งใหญ่เริ่มต้นด้วยจุดหมายปลายทาง\"",
          label: "คลังข้อมูลจุดหมายปลายทาง",
          placeholder: "เช่น เกียวโต ญี่ปุ่น หรือ ฮอยอัน เวียดนาม",
          daysLabel: "ขอบเขตเวลา (วัน)"
        },
        step2: {
          title: "มรดกทางสังคม",
          subtitle: "กลิ่นอายของการพักผ่อนถูกกำหนดโดยหน่วยหลักของมัน",
          solo: "เดินทางคนเดียว",
          couple: "คู่รัก",
          family: "ครอบครัว",
          friends: "เพื่อน"
        },
        step3: {
          title: "จุดเน้นงานฝีมือ",
          subtitle: "เลือกเสาหลักทางวัฒนธรรมของคุณสำหรับการคัดสรร",
          interests: {
            culture: "วัฒนธรรมและประวัติศาสตร์",
            nature: "ธรรมชาติ",
            food: "อาหารและการรับประทาน",
            adventure: "การผจญภัย",
            shopping: "การช้อปปิ้ง",
            nightlife: "ชีวิตยามค่ำคืน",
            art: "ศิลปะและการถ่ายภาพ",
            relaxation: "การพักผ่อน"
          }
        },
        step4: {
          title: "การลงทุน",
          subtitle: "กำหนดขนาดของการพักผ่อนของคุณ",
          budget: {
            modest: { label: "ประหยัด", desc: "ที่พักท้องถิ่นที่แท้จริงและสตรีทฟู้ดที่ซ่อนอยู่" },
            balanced: { label: "สมดุล", desc: "โรงแรมบูติกและการรับประทานอาหารท้องถิ่นที่ประณีต" },
            luxury: { label: "มรดกหรูหรา", desc: "การพักในคฤหาสน์และการพบปะกับช่างฝีมือสุดพิเศษ" }
          }
        },
        back: "คลังข้อมูล",
        advance: "ขั้นตอนต่อไป",
        finish: "เริ่มการคัดสรร"
      },
      loading: {
        progress: "กำลังดำเนินการคัดสรร...",
        engine: "เครื่องยนต์ Plantripgo Artisan Engine · การรักษาพยากรณ์ทางดิจิทัล",
        steps: [
          "กำลังปรับเทียบพิกัดพื้นที่...",
          "กำลังวิเคราะห์ต้นแบบทางวัฒนธรรม...",
          "กำลังสังเคราะห์เส้นทางที่ดีที่สุด...",
          "กำลังรวบรวมลวดลายทางประสาทสัมผัส..."
        ],
        heritage: "ปัญญาพรีเมียม"
      },
      itinerary: {
        archive: "คลังข้อมูลแผนการเดินทาง",
        duration: "ระยะเวลา",
        style: "สไตล์",
        provision: "งบประมาณ",
        days: "วัน",
        export: "ส่งออก",
        reset: "เริ่มใหม่",
        timeline: "ลำดับเวลา",
        validated: "เฉพาะเส้นทางที่เข้มข้นเท่านั้น",
        day: "วัน",
        curationNote: "หมายเหตุการเดินทาง",
        localIntelligence: "ข้อมูลท้องถิ่น",
        spatialIndex: "ดัชนีพื้นที่",
        openAtlas: "เปิดแผนที่",
        footer: "เว็บไซต์โดยกลุ่ม 7 สำหรับวิชาการท่องเที่ยวอิเล็กทรอนิกส์",
        optimized: "เส้นทางที่เหมาะสมที่สุด",
        changeDates: "เปลี่ยนวันที่",
        budgetControl: "ควบคุมงบประมาณ",
        estimated: "ประมาณการ",
        actualSpent: "จ่ายจริง",
        points: "จุดเช็คอิน",
        activityName: "ชื่อกิจกรรม",
        saveCuration: "บันทึกการจัดเตรียม",
        securingSelection: "กำลังรักษาความปลอดภัยการเลือก...",
        secureVerification: "การตรวจสอบความปลอดภัย",
        guests_one: "ท่าน",
        guests_other: "ท่าน",
        placeholder_name: "สมชาย ใจดี",
        placeholder_phone: "081-000-0000",
        placeholder_email: "somchai@email.com",
        location_placeholder: "เพิ่มรายละเอียดสถานที่...",
        savedBtn: "บันทึก",
        savedBtnActive: "บันทึกแล้ว",
        downloadBtn: "ดาวน์โหลด PDF",
        travelInsights: {
          title: "ข้อมูลเชิงลึกการเดินทาง",
          warnings: "คำเตือนที่เป็นประโยชน์",
          tips: "เคล็ดลับวงใน"
        },
        travelAlerts: {
          title: "การแจ้งเตือนการเดินทาง",
          weather: "สภาพอากาศตามฤดูกาล",
          risks: "ความเสี่ยงทั่วไป",
          scams: "การแจ้งเตือนการหลอกลวง"
        }
      },
      chatbot: {
        title: "ผู้ช่วย PLANTRIPGO",
        welcome: "สวัสดีครับ ยินดีต้อนรับสู่ผู้ช่วย PLANTRIPGO มีอะไรให้ผมช่วยไหมครับ?",
        placeholder: "พิมพ์ข้อความของคุณ...",
        send: "ส่ง",
        typing: "กำลังพิมพ์...",
        faq1: "PLANTRIPGO คืออะไร?",
        faq2: "บันทึกแผนการเดินทางอย่างไร?",
        faq3: "ราคาประเมินแม่นยำไหม?",
        fallback: "ขออภัยครับ ไม่พบข้อมูลดังกล่าว โปรดติดต่อเราที่: SUPPORT@PLANTRIPGO.COM"
      }
    }
  },
  lo: {
    translation: {
      nav: {
        logo: "Plantripgo",
        history: "ປະຫວັດການເດີນທາງ",
        saved: "ບັນທຶກແລ້ວ"
      },
      landing: {
        title: "ການຈັດການການເດີນທາງແບບປະນີດ",
        subtitle: "ສຳຫຼວດໂລກຜ່ານມຸມມອງຂອງປັນຍາປະດິດ ແລະ ມໍລະດົກທາງດິຈິຕອນ",
        getStarted: "ເລີ່ມຕົ້ນການເດີນທາງ",
        explore: "ສຳຫຼວດຄັງຂໍ້ມູນ",
        badge: "ທຣິບສ່ວນຕົວທີ່ອອກແບບໂດຍ AI",
        titleMain: "ອອກແບບ\nການພັກຜ່ອນ\nທີ່ປະນີດຂອງທ່ານ",
        description: "ເສັ້ນທາງທ່ອງທ່ຽວທີ່ອອກແບບຢ່າງຫຼູຫຼາສຳລັບນັກສຳຫຼວດທີ່ຊັບຊ້ອນ. ຈາກທີ່ພັກທີ່ເຕັມໄປດ້ວຍມໍລະດົກທາງວັດທະນະທຳ ຈົນເຖິງທີ່ພັກແບບມິນິມໍ",
        plan: "ວາງແຜນການເດີນທາງ",
        gallery: "ເບິ່ງແກເລີຣີ",
        heritage: "ມໍລະດົກ",
        minimal: "ມິນິມໍ",
        retreatTitle: "ການພັກຜ່ອນໃນຮອຍອັນ",
        retreatDesc: "ປະສົບການ 4 ວັນທີ່ຄັດສັນມາຢ່າງດີໃນໃຈກາງຫວຽດນາມ",
        authLabel: "ໄດ້ຮັບການຢືນຢັນແລ້ວ",
        authValue: "ເສັ້ນທາງທີ່ຜ່ານການຮັບຮອງ",
        feature1Title: "ຕັກກະທີ່ປະນີດ",
        feature1Desc: "ເຄື່ອງຈັກຂອງພວກເຮົາເລືອກຈຸດໝາຍປາຍທາງທີ່ສ້າງຄວາມສົມດຸນລະຫວ່າງຄວາມງາມທາງສາຍຕາ ແລະ ຄວາມເລິກເຊິ່ງທາງວັດທະນະທຳ",
        feature2Title: "ການເດີນທາງທີ່ໜ້ອຍທີ່ສຸດ",
        feature2Desc: "ການຈັດລຳດັບການຢຸດພັກຢ່າງຊານສະຫຼາດເພື່ອຫຼຸດຜ່ອນຄວາມອິດເມື່ອຍ ແລະ ຜົນກະທົບຕໍ່ສິ່ງແວດລ້ອມ",
        feature3Title: "ສົ່ງອອກມໍລະດົກ",
        feature3Desc: "ດາວໂຫຼດແຜນການເດີນທາງທີ່ມີການຈັດພິມຢ່າງສວຍງາມ ພ້ອມສຳລັບບັນທຶກ ຫຼື ແບ່ງປັນ"
      },
      setup: {
        exit: "ອອກຈາກລະບົບອອກແບບ",
        steps: {
          1: "ພື້ນທີ່",
          2: "ສັງຄົມ",
          3: "ງານສີມື",
          4: "ການລົງທຶນ"
        },
        step1: {
          title: "ບໍລິບົດຂອງພື້ນທີ່",
          subtitle: "\"ທຸກການເດີนທາງທີ່ຍິ່ງໃຫຍ່ເລີ່ມຕົ້ນດ້ວຍຈຸດໝາຍປາຍທາງ\"",
          label: "ຄັງຂໍ້ມູນຈຸດໝາຍປາຍທາງ",
          placeholder: "ເຊັ່ນ ກຽວໂຕ ຍີ່ປຸ່ນ ຫຼື ຮອຍອັນ ຫວຽດນາມ",
          daysLabel: "ຂອບເຂດເວລາ (ວັນ)"
        },
        step2: {
          title: "ມໍລະດົກທາງສັງຄົມ",
          subtitle: "ກິ່ນອາຍຂອງການພັກຜ່ອນຖືກກຳນົດໂດຍໜ່ວຍຫຼັກຂອງມັນ",
          solo: "ເດີນທາງຄົນດຽວ",
          couple: "ຄູ່ຮັກ",
          family: "ຄອບຄົວ",
          friends: "ເພື່ອນ"
        },
        step3: {
          title: "ຈຸດເນັ້ນງານສີມື",
          subtitle: "ເລືອກເສົາຫຼັກທາງວັດທະນະທຳຂອງທ່ານສຳລັບການຄັດສັນ",
          interests: {
            culture: "ວັດທະນະທຳ ແລະ ປະຫວັດສາດ",
            nature: "ທຳມະຊາດ",
            food: "ອາຫານ ແລະ ບໍລິໂພກ",
            adventure: "ການຜະຈົນໄພ",
            shopping: "ການຊ້ອປປິ້ງ",
            nightlife: "ຊີວິດຍາມຄ່ຳຄືນ",
            art: "ສິລະປະ ແລະ ການຖ່າຍພາບ",
            relaxation: "ການພັກຜ່ອນ"
          }
        },
        step4: {
          title: "ການລົງທຶน",
          subtitle: "ກຳນົດຂະໜາດຂອງການພັກຜ່อนຂອງທ່ານ",
          budget: {
            modest: { label: "ປະຢັດ", desc: "ທີ່ພັກທ້ອງຖິ່ນທີ່ແທ້ຈິງ ແລະ ສະຕຣີດຟູ້ດທີ່ຊ້ອນຢູ່" },
            balanced: { label: "ສົມດຸນ", desc: "ໂຮງແຮມບູຕິກ ແລະ ການຮັບປະທານອາຫານທ້ອງຖິ່ນທີ່ປະນີດ" },
            luxury: { label: "ມໍລະດົກຫຼູຫຼາ", desc: "ການພັກໃນຄະລຶຫາດ ແລະ ການພົບປະກັບຊ່າງຝີມືສຸດພິເສດ" }
          }
        },
        back: "ຄັງຂໍ້ມູນ",
        advance: "ຂັ້ນຕອນຕໍ່ໄປ",
        finish: "ເລີ່ມການຄັດສັນ"
      },
      loading: {
        progress: "ກຳລັງດຳເນີນການຄັດສັນ...",
        engine: "ເຄື່ອງຈັກ Plantripgo Artisan Engine · ການຮັກສາພະຍາກອນທາງດິຈິຕອນ",
        steps: [
          "ກຳລັງປັບທຽບພິກັດພື້ນທີ່...",
          "ກຳລັງວິເຄາະຕົ້ນແບບທາງວັດທະນະທຳ...",
          "ກຳລັງສັງເຄາະເສັ້ນທາງທີ່ດີທີ່ສຸດ...",
          "ກຳລັງລວບລວມລວດລາຍທາງປະສາດສຳຜັດ..."
        ],
        heritage: "ປັນຍາພຣີມຽມ"
      },
      itinerary: {
        archive: "ຄັງຂໍ້ມູນແຜນການເດີນທາງ",
        duration: "ໄລຍະເວລາ",
        style: "ສະໄຕລ໌",
        provision: "ງົບປະມານ",
        days: "ວັນ",
        export: "ສົ່ງອອກ",
        reset: "ເລີ່ມໃໝ່",
        timeline: "ລຳດັບເວລາ",
        validated: "ສະເພาະເສັ້ນທາງທີ່ເຂັ້ມຂຸ້ນເທົ່ານັ້ນ",
        day: "ວັນ",
        curationNote: "ໝາຍເຫດການເດີນທາງ",
        localIntelligence: "ຂໍ້ມູນທ້ອງຖິ່ນ",
        spatialIndex: "ດັດຊະນີພື້ນທີ່",
        openAtlas: "ເປີດແຜນທີ່",
        footer: "ເວັບໄຊໂດຍກຸ່ມ 7 ສໍາລັບວິຊາການທ່องທ່ຽວເອເລັກໂຕຣນິກ",
        optimized: "ເສັ້ນທາງທີ່ເໝາະສົມທີ່ສຸດ",
        changeDates: "ປ່ຽນວັນທີ",
        budgetControl: "ຄວບຄຸມງົບປະມານ",
        estimated: "ປະມານການ",
        actualSpent: "ຈ່າຍຈິງ",
        points: "ຈຸດເຊັກອິນ",
        activityName: "ຊື່ກິດຈະກໍາ",
        saveCuration: "ບັນທຶກການຈັດຕຽມ",
        securingSelection: "ກຳລັງຮັກສາຄວາມປອດໄພການເລືອກ...",
        secureVerification: "ການກວດສອບຄວາມປອດໄພ",
        guests_one: "ທ່ານ",
        guests_other: "ທ່ານ",
        placeholder_name: "ສົມສັກ",
        placeholder_phone: "020-0000-0000",
        placeholder_email: "somsak@email.com",
        location_placeholder: "ເພີ່ມລາຍລະອຽດສະຖານທີ່...",
        savedBtn: "ບັນທຶក",
        savedBtnActive: "ບັນທຶកແລ້ວ",
        downloadBtn: "ດາວໂຫລດ PDF",
        travelInsights: {
          title: "ຂໍ້ມູນເຈາະເລິກການເດີນທາງ",
          warnings: "ຄໍາເຕືອນພາກປະຕິບັດ",
          tips: "ຄໍາແນະນໍາຈາກພາຍໃນ"
        },
        travelAlerts: {
          title: "ການແຈ້ງເຕືອນການເດີนທາງ",
          weather: "ສະພາບອາກາດຕາມລະດູການ",
          risks: "ຄວາມສ່ຽງທົ່ວໄປ",
          scams: "ການແຈ້ງເຕືອນການຫຼອກລວງ"
        }
      }
    }
  },
  km: {
    translation: {
      nav: {
        logo: "Plantripgo",
        history: "ប្រវត្តិធ្វើដំណើរ",
        saved: "បានរក្សាទុក"
      },
      landing: {
        title: "ការរៀបចំដំណើរកម្សាន្តបែបប្រណីត",
        subtitle: "ស្វែងរកពិភពលោកតាមរយៈទស្សនៈនៃបញ្ញាសិប្បនិម្មិត និងកេរដំណែលឌីជីថល",
        getStarted: "ចាប់ផ្ដើមដំណើរកម្សាន្ត",
        explore: "ស្វែងរកបណ្ណសារ",
        badge: "ដំណើរកម្សាន្តផ្ទាល់ខ្លួនដោយ AI",
        titleMain: "រចនា\nការសម្រាកលំហែ\nដ៏ប្រណីតរបស់អ្នក",
        description: "ផ្លូវធ្វើដំណើរដែលបានរចនាយ៉ាងប្រណីតសម្រាប់អ្នករុករកដ៏ទំនើប ចាប់ពីកន្លែងស្នាក់នៅសម្បូរបែបដោយមរតក រហូតដល់កន្លែងសម្រាកបែបមីនីម៉ល",
        plan: "រៀបចំដំណើរកម្សาน្ត",
        gallery: "មើលវិចិត្រសាល",
        heritage: "មរតក",
        minimal: "មីនីម៉ល",
        retreatTitle: "ការសម្រាកនៅហូយអាន",
        retreatDesc: "បទពិសោធន៍ 4 ថ្ងៃដែលត្រូវបានជ្រើសរើសយ៉ាងសម្រិតសម្រាំងនៅកណ្តាលប្រទេសវៀតណាម",
        authLabel: "បានផ្ទៀងផ្ទាត់",
        authValue: "ផ្លូវដែលបានបញ្ជាក់",
        feature1Title: "តក្កវិជ្ជាដ៏ប្រណីត",
        feature1Desc: "ម៉ាស៊ីนរបស់យើងជ្រើសរើសគោលដៅដែលរក្សាតុល្យភាពរវាងសម្រស់ទស្សนីយភាព និងភាពស៊ីជម្រៅនៃវប្បធម៌",
        feature2Title: "ការធ្វើដំណើរកម្រិតអប្បបរមា",
        feature2Desc: "ការរៀបចំលំដាប់លំដោយនៃការឈប់សម្រាកដោយឆ្លាតវៃ ដើម្បីកាត់បន្ថយភាពនឿយហត់ និងផលប៉ះពាល់ដល់បរិស្ថាន",
        feature3Title: "នាំចេញមរតក",
        feature3Desc: "ទាញយកគម្រោងធ្វើដំណើរដែលមានការរៀបចំយ៉ាងស្អាត ត្រៀមសម្រាប់ការរក្សាទុក ឬចែករំលែក"
      },
      setup: {
        exit: "ចាកចេញពីប្រព័ន្ធរចនា",
        steps: {
          1: "លំហ",
          2: "សង្គម",
          3: "សិប្បកម្ម",
          4: "ការវិនិយោគ"
        },
        step1: {
          title: "បរិបទនៃលំហ",
          subtitle: "\"រាល់ដំណើរកម្សាន្តដ៏អស្ចារ្យចាប់ផ្ដើមដោយគោលដៅ\"",
          label: "បណ្ណសារគោលដៅ",
          placeholder: "ឧទាហរណ៍៖ ក្យូតូ ជប៉ុន ឬ ហូយអាន វៀតណាម",
          daysLabel: "រយៈពេល (ថ្ងៃ)"
        },
        step2: {
          title: "មរតកសង្គម",
          subtitle: "បរិយាកាសនៃការសម្រាកលំហែត្រូវបានកំណត់ដោយអង្គភាពស្នូលរបស់វា",
          solo: "ធ្វើដំណើរម្នាក់ឯង",
          couple: "គូស្នេហ៍",
          family: "គ្រួសារ",
          friends: "មិត្តភក្តិ"
        },
        step3: {
          title: "ការផ្ដោតលើសិប្បកម្ម",
          subtitle: "ជ្រើសរើសសសរស្តម្ភវប្បធម៌របស់អ្នកសម្រាប់ការសម្រិតសម្រាំង",
          interests: {
            culture: "វប្បធម៌ និងប្រវត្តិសាស្ត្រ",
            nature: "ធម្មជាតិ",
            food: "អាហារ និងការទទួលទាន",
            adventure: "ការផ្សងព្រេង",
            shopping: "ការទិញទំនិញ",
            nightlife: "ជីវិតពេលរាត្រី",
            art: "សិល្បៈ និងរូបភាព",
            relaxation: "ការសម្រាកលំហែ"
          }
        },
        step4: {
          title: "ការវិនិយោគ",
          subtitle: "កំណត់ទំហំនៃការសម្រាកលំហែរបស់អ្នក",
          budget: {
            modest: { label: "សន្សំសំចៃ", desc: "កន្លែងស្នាក់នៅបែបស្រុកស្រែពិតៗ និងអាហារតាមចិញ្ចើមផ្លូវ" },
            balanced: { label: "សមតុល្យ", desc: "សណ្ឋាគារប៊ូទិក និងការទទួលទានអាហារក្នុងស្រុកដ៏ប្រណីត" },
            luxury: { label: "មរតកដ៏ស្កឹមស្កៃ", desc: "ការស្នាក់នៅក្នុងភូមិគ្រឹះ និងការជួបជាមួយសិប្បករផ្តាច់មុខ" }
          }
        },
        back: "បណ្ណសារ",
        advance: "ជំហានបន្ទាប់",
        finish: "ចាប់ផ្ដើមការសម្រិតសម្រាំង"
      },
      loading: {
        progress: "កំពុងរៀបចំការសម្រិតសម្រាំង...",
        engine: "ម៉ាស៊ីន Plantripgo Artisan Engine · ការរក្សាការព្យាករណ៍ឌីជីថល",
        steps: [
          "កំពុងកំណត់កូអរដោនែលំហ...",
          "កំពុងវិភាគប្រភេទវប្បធม៌...",
          "កំពុងសំយោគផ្លូវដ៏ល្អបំផុត...",
          "កំពុងបញ្ចូលក្បូរក្បាច់នៃអារម្មណ៍..."
        ],
        heritage: "បញ្ញាដ៏ប្រណីត"
      },
      itinerary: {
        archive: "បណ្ណសារគម្រោងធ្វើដំណើរ",
        duration: "រយៈពេល",
        style: "ស្ទីល",
        provision: "ថវិកា",
        days: "ថ្ងៃ",
        export: "នាំចេញ",
        reset: "សារជាថ្មី",
        timeline: "លំដับពេលវេលា",
        validated: "សម្រាប់តែផ្លូវដែលបានជ្រើសរើសសម្រិតសម្រាំង",
        day: "ថ្ងៃ",
        curationNote: "ការសម្រិតសម្រាំងផ្តល់អាទិភាពដល់មរតកសិប្បកម្ម និងកាត់បន្ថយភាពនឿយហត់ក្នុងលំហ",
        spatialIndex: "សន្ទស្សន៍លំហ",
        openAtlas: "បើកផែនទី",
        localIntelligence: "ព័ត៌មានក្នុងស្រុក",
        footer: "គេហទំព័រដោយក្រុមទី 7 សម្រាប់វគ្គសិក្សាទេសចរណ៍អេឡិចត្រូនិក",
        optimized: "ផ្លូវដែលប្រសើរបំផុត",
        changeDates: "ផ្លាស់ប្តូរថ្ងៃខែ",
        budgetControl: "ការគ្រប់គ្រងថវិកា",
        estimated: "ការប៉ាន់ស្មាន",
        actualSpent: "ចំណាយជាក់ស្តែង",
        points: "ចំណុច",
        activityName: "ឈ្មោះសកម្មភាព",
        saveCuration: "រក្សាទុកការរៀបចំ",
        securingSelection: "កំពុងការពារការជ្រើសរើស...",
        secureVerification: "ការផ្ទៀងផ្ទាត់សុវត្ថិភាព",
        guests_one: "នាក់",
        guests_other: "នាក់",
        placeholder_name: "សុខា",
        placeholder_phone: "012-000-000",
        placeholder_email: "sokha@email.com",
        location_placeholder: "បន្ថែមព័ត៌មានលម្អិតអំពីទីតាំង..."
      },
      chatbot: {
        title: "ជំនួយការ PLANTRIPGO",
        welcome: "សួស្តី! ខ្ញុំជាជំនួយការ PLANTRIPGO។ តើមានអ្វីឱ្យខ្ញុំជួយទេ?",
        placeholder: "វាយសាររបស់អ្នក...",
        send: "ផ្ញើ",
        typing: "កំពុងវាយ...",
        faq1: "អ្វីទៅជា PLANTRIPGO?",
        faq2: "តើត្រូវរក្សាទុកការធ្វើដំណើរដោយរបៀបណា?",
        faq3: "តើតម្លៃប៉ាន់ស្មានត្រឹមត្រូវដែរឬទេ?",
        fallback: "សូមអភ័យទោស ខ្ញុំរកមិនឃើញព័ត៌មាននោះទេ។ សូមទាក់ទងមកយើងខ្ញុំតាមរយៈ៖ SUPPORT@PLANTRIPGO.COM"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
