#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItSetShRegOffsetDef {
    static constexpr std::uint8_t opcode = 0x50;
    static constexpr std::string_view name = "IT_SET_SH_REG_OFFSET";
    static constexpr std::string_view desc = "Write shader register relative to dynamic register bank base";
};
}
