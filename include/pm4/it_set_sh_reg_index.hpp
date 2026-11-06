#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItSetShRegIndexDef {
    static constexpr std::uint8_t opcode = 0x4c;
    static constexpr std::string_view name = "IT_SET_SH_REG_INDEX";
    static constexpr std::string_view desc = "Write shader register using indexed addressing offset";
};
}
